import type { JSX } from "react"
import { useState, useRef, useEffect } from "react"
import type { DieData } from "./utils"
import { generateAllNewDice, rollDice, holdDie } from "./utils"
import Die from "./components/Die"

import Confetti from "react-confetti"

export default function App():JSX.Element {
    const [dice, setDice] = useState<DieData[]>(() => generateAllNewDice())
    const buttonRef = useRef<HTMLButtonElement>(null)

    const gameWon: boolean = dice.every((die:DieData) => die.isHeld) &&
        dice.every((die:DieData) => die.value === dice[0].value)
        
    useEffect(() => {
        if (gameWon && buttonRef.current) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function handleRollButton(): void {
      if (gameWon) {
          setDice(generateAllNewDice())
          return
      }
      setDice(prevDice => rollDice(prevDice) )
    }

    function handleHold(id: string): void {
        setDice(prevDice => holdDie(prevDice, id) )
    }

    const diceElements: JSX.Element[] = dice.map((dieObj: DieData): JSX.Element => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => handleHold(dieObj.id)}
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
            <button ref={buttonRef} className="roll-dice" onClick={handleRollButton}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}