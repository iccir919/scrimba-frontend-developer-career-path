export default function Question({ question }) {

    function randomlyInsertElement(element, array) {
        const index = Math.floor(Math.random() * (array.length + 1))
        const newArray = [
            ...array.slice(0, index),
            element,
            ...array.slice(index)
        ]
        return newArray
    }

    question.possible_answers = randomlyInsertElement(
        question.correct_answer,
        question.incorrect_answers
    )

    return (
        <div className="question-container">
            <h2>{question.question}</h2>

            <div className="answers-container">
                {question.possible_answers.map(answer => (
                    <label>
                        <input type="radio" name={question.question} value={answer} />
                        {answer}
                    </label>
                ))}
            </div>
        </div>
    )
}