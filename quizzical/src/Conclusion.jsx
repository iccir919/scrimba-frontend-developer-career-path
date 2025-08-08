export default function Conclusion({ questions, guesses }) {

    const correctGuessesAmount = guesses.filter(guessObj => {
        const question = questions.filter(question => question.question_id === guessObj.question_id)[0]
        return question.correct_answer === guessObj.guess
    }).length

    return (
        <div className="conclusion-container">
            <p>You scored {correctGuessesAmount}/5 correct answers.</p>
            <button>Play again</button>
        </div>
    )
}