import { nanoid } from "nanoid"

export type DieData = {
    value: number,
    isHeld: boolean,
    id: string
}

export function generateAllNewDice(): DieData[] {
    return new Array(10)
        .fill(0)
        .map((): DieData => ({
            value: getRandomDieValue(),
            isHeld: false,
            id: nanoid()
        }))
}

export function rollDice(dice: DieData[]): DieData[] {
    return dice.map((die: DieData): DieData =>
        die.isHeld ?
            die :
            { ...die, value: getRandomDieValue() }
    )
}

function getRandomDieValue(): number {
    return Math.ceil(Math.random() * 6)
}

export function holdDie(dice: DieData[], id: string): DieData[] {
    return dice.map((die: DieData): DieData =>
        die.id === id ?
            { ...die, isHeld: !die.isHeld } :
            die
    )
}