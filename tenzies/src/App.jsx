import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice())
  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

    useEffect(() => {
      if (gameWon) {
          buttonRef.current.focus()
      }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        // value: Math.ceil(Math.random() * 6),
        value: 5,
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => 
      die.isHeld ? 
        die : 
        { ...die, value: Math.ceil(Math.random() * 6) }
    ))
  }

  function newGame() {
    setDice(generateAllNewDice())
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die => 
      die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    ))
  }

  const diceElements = dice.map(dieObj => (
    <Die 
      key={dieObj.id} 
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>

      <button
        ref={buttonRef} 
        className="roll-dice" 
        onClick={gameWon ? newGame : rollDice}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

