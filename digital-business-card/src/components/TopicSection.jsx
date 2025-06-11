export default function TopicSection(props) {
    return (
        <section className="topic-section-container">
            <h2 className="topic-section-title">{props.sectionTitle}</h2>
            <p className="topic-section-content">{props.content}</p>
        </section>
    )
}