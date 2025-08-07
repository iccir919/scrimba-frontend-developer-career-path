import Question from "./Question"

export default function Quiz({ questions, guesses, handleGuess }) {

    function verify(formData) {
        console.log("Quiz Submitted!")
        for( let prop of formData.entries()) {
            console.log(prop)
        }
    }

    return (
        <form action={verify} className="quiz-container">
            {questions.map((question) => (
                <Question 
                    key={`question-${question.question_id}`}
                    question={question}
                    handleGuess={handleGuess}
                    guess={guesses.filter(guess => guess.question_id === question.question_id)[0]}
                />
            ))}
            <button>Check answers</button>
        </form>
    )
}