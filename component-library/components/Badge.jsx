import classNames from "classnames"

export default function Badge({ 
    children, 
    color = "grey",
    type = "square"
}) {

    const componentClassNames = classNames("badge", {
        "pill": type === "pill",
        "square": type === "square",
        "grey": color === "grey",
        "red": color === "red",
        "yellow": color === "yellow",
        "green": color === "green",
        "blue": color === "blue",
        "purple": color === "purple",
        "indigo": color === "indigo",
        "pink": color === "pink"
    })

    return (
        <div className={componentClassNames}>
            <span>{children}</span>
        </div>
    )
}