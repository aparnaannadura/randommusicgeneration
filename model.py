import random

def generate_music_sequence(sequence_length):
    """
    Generate a random sequence of music notes based on keyboard letters A-G.
    """
    notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    sequences = []
    
    for _ in range(sequence_length):
        sequence = [random.choice(notes) for _ in range(random.randint(5, 10))]
        sequences.append(sequence)
    
    return sequences
