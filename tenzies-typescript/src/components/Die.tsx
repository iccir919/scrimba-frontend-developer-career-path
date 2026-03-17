import type { DieData } from "../utils"
import type { JSX } from "react"

type DieProps = Pick<DieData, "value" | "isHeld"> & {
    hold: () => void
}

export default function Die(props: DieProps): JSX.Element {
    
    return (
        <button 
            style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}