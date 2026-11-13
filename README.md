# Security+ SY0-701 Flashcard Study App

A keyword flashcard app for studying the CompTIA Security+ SY0-701 exam. Each card shows the cue words an exam question uses on the front and the official CompTIA term on the back. Cards are drawn at random, with known cards drawn less often. Includes domain/objective filtering and portable progress via JSON export/import.

## Requirements

- Python 3.10+
- pip3

## Setup

Install Flask (first time only):

```bash
pip3 install --user flask
```

## Starting the App

```bash
cd /path/to/security_plus_flashcards
python3 -m flask run
```

Then open your browser and go to:

```
http://localhost:5000
```

To stop the server, press `Ctrl+C` in the terminal.

## Features

- **670 keyword cards** covering every official term in all 28 objectives, built from the keyword cheat sheet
- **Weighted random selection:** each session draws 20 random cards. A card marked **Known** is 1/5 as likely to be drawn as one still being learned (`KNOWN_WEIGHT` in `static/js/card_selection.js`)
- **Two buttons:** Still learning / Known. Marking a known card "Still learning" makes it common again
- **Domain & objective filtering** — study only what you need
- **Export/Import progress** as JSON for portability and git-based backup

## Rebuilding the Deck

Cards are generated from `source/comptia_keyword_cheatsheet.md` (one card per table row). This is a copy of the master cheat sheet kept in the repo so the deck can be rebuilt anywhere:

```bash
python3 tools/build_cards.py source/comptia_keyword_cheatsheet.md
```

Card IDs are derived from each row's content, so rebuilding after adding rows keeps your Known marks. Editing a row's text resets that card to Still learning.

The original 180-card Q&A deck and its SM-2 progress template are kept unused in `data/backup/`.

## Saving Progress to Git

1. In the app, go to **Settings → Export Progress as JSON**
2. Save the file as `data/default_progress.json` in the project directory
3. Commit and push — your progress will be restored on any machine

## Exam Domains

| Domain | Title | Exam Weight |
|--------|-------|-------------|
| 1.0 | General Security Concepts | 12% |
| 2.0 | Threats, Vulnerabilities, and Mitigations | 22% |
| 3.0 | Security Architecture | 18% |
| 4.0 | Security Operations | 28% |
| 5.0 | Security Program Management and Oversight | 20% |
