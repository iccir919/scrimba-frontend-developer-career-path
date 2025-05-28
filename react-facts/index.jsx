import { createRoot } from "react-dom/client"
const root = createRoot(document.getElementById("root"))

function Header() {
    return (
        <header className="header">
            <h1>React Rocks!</h1>
            <nav>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <a href="https://react.dev/">
                            React Documentation
                        </a>
                    </li>
                    <li className="nav-list-item">
                        <a href="https://www.reddit.com/r/reactjs/">
                            ReactJS Subreddit
                        </a>
                    </li>
                    <li className="nav-list-item">
                        <a href="https://github.com/reactjs">
                            React Github Community
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

function MainContent() {
    return (
        <main>
            <h2>Reasons I am excited to learn React</h2>
            <ol>
                <li>React is a popular library, so I will be able to fit in with all the coolest devs out there! 😎</li>
                <li>I am more likely to get a job as a front end developer if I know React</li>
                <li>I am excited to learn about the benefits, like optimization of page spped, with using React</li>
            </ol>
        </main>
    )
}

function Footer() {
    return (
        <footer>
            <small>©2025 Ricci development. All rights reserved.</small>
        </footer>
    )
}

function Page() {
    return (
        <>
            <Header />
            <MainContent />
            <Footer />
        </>
    )
}

root.render(
    <Page />
)
