# D:\nndl\music-generator-backend\app.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from midi_utils import create_midi_file  # Only import create_midi_file

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate', methods=['POST'])
def generate_music():
    data = request.get_json()
    notes = data.get('notes', [])
    # Your music generation logic here, e.g., create_midi_file(notes)
    filename = 'generated_music.mid'  # Example filename
    create_midi_file(notes, filename)  # Use your function to create a MIDI file
    return jsonify(success=True, filename=filename)

if __name__ == '__main__':
    app.run(debug=True)
