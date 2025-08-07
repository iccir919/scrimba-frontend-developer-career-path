import clsx from "clsx"

export default function QuizButton({ isQuizFinished, verifyGuesses }) {

    const buttonClassName = clsx({
        disabled: !isQuizFinished
    })

    console.log(buttonClassName)

    return (
        <button
            className={buttonClassName}
            onClick={verifyGuesses}
        >
            Check answers
        </button>
    )
}