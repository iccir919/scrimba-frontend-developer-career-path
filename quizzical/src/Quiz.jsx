import Question from "./Question"
import QuizAction from "./QuizAction"

export default function Quiz({ questions, handleGuess, handleQuizSubmit, handleNewQuiz, isQuizCompleted }) {

    const isQuizAnswered = questions
        .map(question => question.guess)
        .filter(question_guess => question_guess)
        .length === questions.length

    return (
        <div className="quiz-container">
            <form action={handleQuizSubmit} className="form-container">
                {questions.map((question) => (
                    <Question 
                        key={`question-${question.question_id}`}
                        question={question}
                        handleGuess={handleGuess}
                        isQuizCompleted={isQuizCompleted}
                    />
                ))}
            </form>
            <QuizAction 
                isQuizCompleted={isQuizCompleted} 
                questions={questions} 
                handleNewQuiz={handleNewQuiz}
                handleQuizSubmit={handleQuizSubmit}
                isQuizAnswered={isQuizAnswered} 
            />
        </div>
    )
}