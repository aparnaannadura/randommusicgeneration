# D:\nndl\music-generator-backend\midi_utils.py
from midiutil import MIDIFile

def create_midi_file(sequences, filename='output.mid'):
    print(f"Creating MIDI file with sequences: {sequences}")  # Debugging line
    midi_file = MIDIFile(1)  # One track
    midi_file.addTrackName(0, 0, "Track")
    midi_file.addTempo(0, 0, 120)  # Set the tempo

    for i, sequence in enumerate(sequences):
        for note in sequence:
            midi_note = ord(note) - ord('A') + 60  # Convert note to MIDI number (C4 = 60)
            midi_file.addNote(0, 0, midi_note, i * 1, 1, 100)  # (track, channel, pitch, time, duration, volume)

    with open(filename, 'wb') as output_file:
        midi_file.writeFile(output_file)
    print(f"MIDI file {filename} created successfully.")  # Debugging line

def generate_training_data():
    # Dummy implementation for the sake of example
    # You should implement your own logic here
    sequences = [['C', 'D', 'E'], ['E', 'F', 'G']]
    return sequences
