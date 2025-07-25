import ReactMarkdown from "marked-react"

export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Claude Recommends:</h2>
            <ReactMarkdown children={props.recipe} />
        </section>
    )
}