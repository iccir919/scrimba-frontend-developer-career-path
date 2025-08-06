import Question from "./Question"

export default function Quiz(props) {
    return (
        <form>
            {props.questions.map((question, idx) => (
                <Question 
                    key={idx}
                    question={question}
                />
            ))}
            <button>Check answers</button>
        </form>
    )
}