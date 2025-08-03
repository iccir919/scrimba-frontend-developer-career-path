import React from 'react'
import { clsx } from "clsx"
import { languages } from "./languages.js"
import { getFarewellText, getRandomWord } from './utils.js'

function App() {
  // State values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = React.useState([])

  // Derived values
  const numGuessesLeft = languages.length - 1
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = 
    currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= numGuessesLeft
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessCorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    )
  }

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    const className = clsx("chip", isLanguageLost && "lost")
    return (
      <span
        className={className}
        style={styles}
        key={lang.name}
      >
        {lang.name}
      </span>
    )
  })

  const letterElements = currentWord.split("").map((letter, index) => (
    <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
  ))

  const keyboardElements = alphabet.split("").map(letter => {
    const isGussed = guessedLetters.includes(letter)
    const isCorrect = isGussed & currentWord.includes(letter)
    const isWrong = isGussed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button 
        className={className}
        key={letter}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessCorrect
  })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessCorrect) {
      return (<p className="farewell-message">
        {getFarewellText(languages[wrongGuessCount - 1].name)}
      </p>)
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done!🎉</p>
        </>
      )
    }
    
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section 
        aria-live="polite"
        role="status"
        className={gameStatusClass}
      >
        {renderGameStatus()}
      </section>

      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      {/* Combined visually-hidden aria-live region for status updates*/}
      <section 
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ?
            `Correct! The letter ${lastGuessedLetter} is in the word` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word`
          }
          You have {numGuessesLeft} attempts left.
        </p>

        <p>
          Current word: ${currentWord
          .split("")
          .map(letter => (guessedLetters.includes(letter) ?
            letter + "." : "blank."
          ))
          .join(" ")}
        </p>
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver && <button 
        className="new-game"
        onClick={startNewGame}
      >
        New Game
      </button>}
    </main>
  )
}

export default App
