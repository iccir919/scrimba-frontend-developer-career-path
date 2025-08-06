import Question from "./Question"

export default function Quiz(props) {

    function verify(formData) {
        console.log("Submitted!")
        for( let prop of formData.entries()) {
            console.log(prop)
        }
    }

    return (
        <form action={verify}>
            {props.questions.map((question) => (
                <Question 
                    key={`question-${question.question_id}`}
                    question={question}
                />
            ))}
            <button>Check answers</button>
        </form>
    )
}