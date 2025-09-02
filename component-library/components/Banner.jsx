import classNames from "classnames"
import { 
    BsCheckCircleFill, 
    BsExclamationCircleFill, 
    BsXCircleFill, 
    BsInfoCircleFill
} from "react-icons/bs";


export default function Banner({ 
    status = "success", 
    type = "single",
    title = "Congratulations!",
    text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
}) {

    const componentClassNames = classNames(
        "banner", {
        "success": status === "success",
        "warning": status === "warning",
        "error": status === "error",
        "neutral": status === "neutral",
        "single": type === "single",
        "multi": type === "multi"
    })

    const componentIcon = {
        "success": <BsCheckCircleFill className="icon" />,
        "warning": <BsExclamationCircleFill className="icon" />,
        "error": <BsXCircleFill className="icon" />,
        "neutral": <BsInfoCircleFill className="icon" />
    }
    

    return (
        <div className={componentClassNames}>
            {componentIcon[status]}
            <h4 className="banner-title">{title}</h4>
            { type === "multi" && <p className="banner-text">{text}</p> }
        </div>
    )
}