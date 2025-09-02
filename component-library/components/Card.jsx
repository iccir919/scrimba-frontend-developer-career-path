import { BsCloudUpload } from "react-icons/bs";

export default function Card({ 
    title="Easy Deployment", 
    text="Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.", 
    icon=<BsCloudUpload />, 
    color="#3F75FE", 
}) {
    return (
        <div className="card">
            <div className="card-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{text}</p>
        </div>
    )
}