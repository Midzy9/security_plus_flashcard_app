"""Build data/flashcards.json from the keyword cheat sheet.

Each table row under a "### N.N" heading becomes one card: the stem cue
words on the front, the official CompTIA term on the back.

Usage: python3 tools/build_cards.py /path/to/comptia_keyword_cheatsheet.md
"""
import hashlib
import json
import os
import re
import sys

APP_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Domain/objective names and weights are reused from the original deck.
STRUCTURE = os.path.join(APP_DIR, 'data', 'backup', 'flashcards_v1_qa.json')
OUTPUT = os.path.join(APP_DIR, 'data', 'flashcards.json')


def clean(cell):
    cell = cell.replace('**', '').replace('`', '').strip()
    return re.sub(r'\s+', ' ', cell)


def card_id(objective, front, back):
    # Content-based IDs keep "known" marks attached to the right card when
    # rows are added to or reordered in the cheat sheet.
    digest = hashlib.sha1(f'{objective}|{front}|{back}'.encode()).hexdigest()[:8]
    return f'{objective}-{digest}'


def parse_cheatsheet(path):
    cards = {}
    objective = None
    for line in open(path, encoding='utf-8'):
        heading = re.match(r'### (\d\.\d) ', line)
        if heading:
            objective = heading.group(1)
            cards[objective] = []
            continue
        if line.startswith('## '):
            objective = None  # e.g., the cross-objective lookalikes table
        if not objective or not line.startswith('|'):
            continue
        cells = [c for c in line.strip().strip('|').split('|')]
        if len(cells) != 2 or set(cells[0].strip()) <= set('-') or cells[0].strip() == 'Stem says...':
            continue
        front, back = clean(cells[0]), clean(cells[1])
        if front.startswith('⚠️'):
            continue  # pointer row, not a cue
        cards[objective].append({'id': card_id(objective, front, back), 'question': front, 'answer': back})
    return cards


def main():
    cards = parse_cheatsheet(sys.argv[1])
    structure = json.load(open(STRUCTURE, encoding='utf-8'))
    total = 0
    for domain in structure['domains']:
        for obj in domain['objectives']:
            obj['cards'] = cards.pop(obj['id'], [])
            total += len(obj['cards'])
            ids = [c['id'] for c in obj['cards']]
            assert len(ids) == len(set(ids)), f'duplicate card in {obj["id"]}'
    assert not cards, f'objectives not in structure: {list(cards)}'
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(structure, f, indent=2, ensure_ascii=False)
        f.write('\n')
    print(f'Wrote {total} cards to {OUTPUT}')


if __name__ == '__main__':
    main()
