from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/flashcards')
def get_flashcards():
    with open(os.path.join(DATA_DIR, 'flashcards.json'), 'r') as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/api/default-progress')
def get_default_progress():
    with open(os.path.join(DATA_DIR, 'default_progress.json'), 'r') as f:
        data = json.load(f)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
