import Question from "./Question"
import QuizButton from "./QuizButton"

export default function Quiz({ questions, guesses, handleGuess }) {

    const isQuizFinished = guesses.filter(guessObj => guessObj.guess).length === questions.length
    console.log("isQuizFinished", isQuizFinished)

    function verifyGuesses(formData) {
        for( let prop of formData.entries()) {
            console.log(prop)
        }
    }

    return (
        <form action={verifyGuesses} className="quiz-container">
            {questions.map((question) => (
                <Question 
                    key={`question-${question.question_id}`}
                    question={question}
                    handleGuess={handleGuess}
                    guessObj={guesses.filter(guess => guess.question_id === question.question_id)[0]}
                />
            ))}
            <QuizButton 
                isQuizFinished={isQuizFinished}
            />
        </form>
    )
}