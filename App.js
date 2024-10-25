import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);

    // Function to generate random notes
    const generateRandomNotes = () => {
        const randomNotes = [];
        const possibleNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * possibleNotes.length);
            randomNotes.push(possibleNotes[randomIndex]);
        }
        console.log("Random Notes:", randomNotes); // Debugging line
        setNotes(randomNotes);
    };

    // Function to play the music
    const playMusic = async (generatedNotes) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const noteDuration = 0.7; // Duration of each note in seconds
        const gapBetweenNotes = 0.1; // Gap between notes in seconds

        for (let note of generatedNotes) {
            const oscillator = audioContext.createOscillator();
            const frequency = 440 * Math.pow(2, (note.charCodeAt(0) - 'A'.charCodeAt(0)) / 12); // Convert note to frequency

            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine'; // Smooth sine wave sound

            // Add a gain node for volume control
            const gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Set initial gain to 50%

            // Create a smooth volume fade in and fade out
            gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1); // Fade in over 0.1 seconds
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteDuration - 0.1); // Fade out before note ends

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + noteDuration); // Play for the specified duration

            // Wait for the note to finish before playing the next one
            await new Promise(resolve => setTimeout(resolve, (noteDuration + gapBetweenNotes) * 1000));
        }
    };

    // Function to handle music generation and playback
    const generateAndPlayMusic = async () => {
        generateRandomNotes(); // Generate random notes
        // Add a slight delay to ensure the notes are generated before playing
        await new Promise(resolve => setTimeout(resolve, 100));
        await playMusic(notes); // Play the generated notes
    };

    // Call generateAndPlayMusic when the user clicks the button
    const handleButtonClick = () => {
        generateAndPlayMusic();
    };

    useEffect(() => {
        // Generate and play music when the component mounts
        generateRandomNotes(); // Generate random notes on mount
    }, []);

    return (
        <div className="app-container">
            <h1>🎶 AI Music Generator 🎶</h1>
            <div className="button-container">
                <button className="generate-button" onClick={handleButtonClick}>
                    Generate and Play Music
                </button>
            </div>
            <div className="notes-display">
                <h2>Generated Notes:</h2>
                <p>{notes.join(', ')}</p>
            </div>
        </div>
    );
};

export default App;
