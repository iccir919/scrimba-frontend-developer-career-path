export default function Introduction(props) {
    return (
        <div className="introduction-container">
            <h1>Quizzical</h1>
            <p>a trivia app</p>
            <button
                onClick={props.startQuiz}
            >
                Start quiz
            </button>
        </div>
    )
}