import SubmitButton from "./SubmitButton"

export default function QuizAction({ isQuizCompleted, questions, handleNewQuiz, handleQuizSubmit, isQuizAnswered }) {

    const correctGuessesAmount = questions.filter(question => question.guess === question.correct_answer).length

    const quizConclusion = 
        <>
            <p>You scored {correctGuessesAmount}/5 correct answers.</p>
            <button onClick={handleNewQuiz}>Play again</button>
        </>

    return (
        <div className="quiz-action-container">
            {
                isQuizCompleted ? quizConclusion : 
                    <SubmitButton 
                        handleQuizSubmit={handleQuizSubmit} 
                        isQuizAnswered={isQuizAnswered}
                    />
            }
        </div>
    )
}