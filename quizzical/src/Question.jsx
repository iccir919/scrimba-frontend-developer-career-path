export default function Question({ question }) {



    return (
        <div className="question-container">
            <h2>{question.question}</h2>

            <div className="answers-container">
                {question.possible_answers.map((answer, answer_index) => (
                    <label key={`question-${question.question_id}-answer_${answer_index}`}>
                        <input type="radio" name={`question_${question.question_id}`} value={answer.answer} />
                        {answer.answer}
                    </label>
                ))}
            </div>
        </div>
    )
}