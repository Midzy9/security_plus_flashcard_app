# Security+ SY0-701 Flashcard Study App

## Context
Building a flashcard study app for the CompTIA Security+ SY0-701 exam. The app will help with exam prep alongside Professor Messer and Dion Training video courses. It needs spaced repetition, domain filtering, progress tracking, and portable progress via JSON export/import (committable to git).

## Tech Stack
- **Backend:** Python + Flask (serves JSON data and a single HTML page)
- **Frontend:** Vanilla HTML/CSS/JS (no framework, no build step)
- **Storage:** localStorage in browser, with JSON export/import for portability
- **Data:** Flashcard content in a JSON file organized by domain/objective

## Project Structure
```
security_plus_flashcards/
├── app.py                      # Flask app (3 routes)
├── requirements.txt            # flask>=3.0
├── .gitignore
├── data/
│   ├── flashcards.json         # All card content by domain/objective
│   └── default_progress.json   # Empty/saved progress template
├── static/
│   ├── css/
│   │   └── style.css           # Mobile-first, dark-friendly, card flip animations
│   └── js/
│       ├── app.js              # Init, view routing, event wiring
│       ├── flashcards.js       # Card rendering, flip, session queue
│       ├── spaced_repetition.js # SM-2 algorithm variant
│       └── progress.js         # localStorage, export/import
└── templates/
    └── index.html              # Single-page app shell with 4 views
```

## Flask Routes
- `GET /` — Serve index.html
- `GET /api/flashcards` — Return flashcards.json
- `GET /api/default-progress` — Return default_progress.json

## Frontend Views
1. **Dashboard** — Overall progress bars by domain, start session / review due cards buttons
2. **Domain/Objective Selector** — Checkboxes to filter which objectives to study
3. **Study Session** — Flashcard with flip animation, 3 rating buttons (Again / Hard / Good)
4. **Progress/Settings** — Export/import JSON, reset progress, study stats

## Spaced Repetition (SM-2 Variant)
- 3 buttons: Again (quality=0), Hard (quality=2), Good (quality=4)
- Cards classified as: New, Learning, Due, Mastered (5+ reps, 21+ day interval)
- Session: 20 cards, interleaving due/failed cards with new cards
- Progress stored per card ID in localStorage under key `secplus_progress`

## Flashcard Data Schema
- Card IDs: `{domain}.{objective}.{seq}` (e.g., `1.1.001`)
- Each card has: id, question, answer, tags
- Organized: domains → objectives → cards
- Target: ~5-10 cards per objective (~150-200 total initial set)

## Progress Export/Import
- Export downloads a JSON file with all card progress data
- Import loads a JSON file into localStorage
- On first load, if no localStorage exists, fetches `/api/default-progress` as seed
- User can save exported JSON as `data/default_progress.json` and commit to git for portability

## Implementation Order
1. Create project directory and `app.py`, `requirements.txt`, `.gitignore`
2. Create `templates/index.html` with all 4 view containers
3. Create `static/css/style.css` with layout, card flip, progress bars
4. Create `static/js/spaced_repetition.js` — SM-2 algorithm
5. Create `static/js/progress.js` — localStorage + export/import
6. Create `static/js/flashcards.js` — card rendering and session management
7. Create `static/js/app.js` — init, routing, event binding
8. Create `data/flashcards.json` with full card set across all 28 objectives
9. Create `data/default_progress.json` (empty template)
10. Test the app end-to-end
11. Git init, first commit, push to GitHub

## Verification
- Run `flask run` and open http://localhost:5000
- Verify dashboard loads with progress bars at 0%
- Select a domain, start a study session, flip cards, rate them
- Confirm progress persists on page reload (localStorage)
- Export progress, clear localStorage, import — verify restoration
- Test on mobile viewport (responsive layout)
