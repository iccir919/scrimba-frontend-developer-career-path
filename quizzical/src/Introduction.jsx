import { clsx } from "clsx"


export default function Introduction({ questions, startQuiz }) {

    const startNewQuizButtonClassNames = clsx({
        "disabled": !questions.length
    })

    const startNewQuizButton = (
        <button
            className={startNewQuizButtonClassNames}
            disabled={!questions.length}
            onClick={startQuiz}
        >
            Start quiz
        </button>
    )

    return (
        <div className="introduction-container">
            <h1>Quizzical</h1>
            <p>a trivia app</p>
            {startNewQuizButton}
        </div>
    )
}