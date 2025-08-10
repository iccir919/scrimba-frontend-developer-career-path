

export default function Introduction({ questions, startQuiz, retryQuestions }) {

    const startNewQuizButton = (
        <button
            onClick={startQuiz}
        >
            Start quiz
        </button>
    )

    const retryButton = (
        <>
            <p>There was an error in pulling the questions.</p>
            <button
                onClick={retryQuestions}
            >
                Retry
            </button>        
        </>
    )

    return (
        <div className="introduction-container">
            <h1>Quizzical</h1>
            <p>a trivia app</p>
            {questions.length ? startNewQuizButton : retryButton}
        </div>
    )
}