export default function Footer(props) {

    const socialElements = props.socials.map((social, index) => {
        const [socialName, socialUrl] = Object.entries(social)[0]

        return (
            <li className="social-item" key={index}>
                <a href={socialUrl} target="_blank">
                    <i className={`social-icon fa-brands fa-square-${socialName}`}></i>
                </a>
            </li>
        )
    })

    return (
        <footer>
            <ul className="socials-list">
                {socialElements}
            </ul>
        </footer>
    )
}