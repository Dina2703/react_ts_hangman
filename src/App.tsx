import { useState, useEffect } from "react";
import words from "./wordList.json";
import Keyboard from "./Keyboard";
import { HangmanWord } from "./HangmanWord";
import HangmanDrawing from "./HangmanDrawing";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  console.log(wordToGuess);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  // console.log(wordToGuess);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  function addGuessedLetter(letter: string) {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  }

  useEffect(() => {
    const hanlder = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", hanlder);

    return () => {
      document.removeEventListener("keypress", hanlder);
    };
  }, [guessedLetters]);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
