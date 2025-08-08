import Question from "./Question"
import SubmitButton from "./SubmitButton"
import Conclusion from "./Conclusion" 

export default function Quiz({ questions, guesses, handleGuess, handleQuizSubmit, handleNewQuiz, isQuizCompleted,  }) {

    const isQuizAnswered = guesses.filter(guessObj => guessObj.guess).length === questions.length
    console.log("guesses", guesses)
    return (
        <div className="quiz-container">
            <form action={handleQuizSubmit}>
                {questions.map((question) => (
                    <Question 
                        key={`question-${question.question_id}`}
                        question={question}
                        handleGuess={handleGuess}
                        guessObj={guesses.filter(guess => guess.question_id === question.question_id)[0]}
                        isQuizCompleted={isQuizCompleted}
                    />
                ))}
                {!isQuizCompleted && <SubmitButton isQuizAnswered={isQuizAnswered} />}
            </form>
            {isQuizCompleted && 
                <Conclusion
                    handleNewQuiz={handleNewQuiz}
                    guesses={guesses}
                    questions={questions} 
                />}
        </div>
    )
}