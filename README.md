# Security+ SY0-701 Flashcard Study App

A spaced repetition flashcard app for studying the CompTIA Security+ SY0-701 exam. Features 180 cards across all 28 objectives, SM-2 spaced repetition, domain/objective filtering, and portable progress via JSON export/import.

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

- **180 flashcards** covering all 5 domains and 28 objectives of SY0-701
- **Spaced repetition** (SM-2 algorithm) with Again / Hard / Good buttons
- **Domain & objective filtering** — study only what you need
- **Progress tracking** — New, Learning, Due, and Mastered card states
- **Export/Import progress** as JSON for portability and git-based backup

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
