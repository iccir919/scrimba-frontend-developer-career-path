import clsx from "clsx"

export default function SubmitButton({ isQuizAnswered, handleQuizSubmit }) {

    const buttonClassName = clsx({
        "submit-button": true,
        disabled: !isQuizAnswered
    })

    return (
        <button
            type="button"
            onClick={handleQuizSubmit}
            className={buttonClassName}
        >
            Submit Quiz
        </button>
    )
}