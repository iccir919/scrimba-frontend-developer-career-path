import clsx from "clsx"

export default function SubmitButton({ isQuizAnswered }) {

    const buttonClassName = clsx({
        "submit-button": true,
        disabled: !isQuizAnswered
    })

    return (
        <button
            className={buttonClassName}
        >
            Submit Quiz
        </button>
    )
}