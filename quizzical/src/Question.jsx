import clsx from "clsx"

export default function Question({ question, guessObj, handleGuess }) {

    return (
        <div className="question-container">
            <h2>{question.question}</h2>
            <div className="answers-container">
                {question.possible_answers.map((answer, answer_index) => {
                    
                    const guessedAnswer = answer === guessObj.guess
                    const answerClassName = clsx({
                        "guessed": guessedAnswer
                    })

                    return (
                        <label 
                            key={`question-${question.question_id}-answer_${answer_index}`}
                            className={answerClassName}
                        >
                            <input 
                                type="radio" 
                                name={`question_${question.question_id}`} value={answer} 
                                onClick={() => handleGuess(answer, question.question_id)} 
                            />
                            {answer}
                        </label>
                    )
                })}
            </div>
        </div>
    )
}