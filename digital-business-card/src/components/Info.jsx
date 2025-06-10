export default function Info(props) {
    const { 
        firstName, 
        lastName,
        jobTitle,
        websiteUrl 
    } = props.personInfo
    return (
        <header>
            <img 
                className="person-img"
                src={props.personImgUrl}  
            />
            <div className="person-info-details-container">
                <h1 className="person-name">{firstName} {lastName}</h1>
                <p className="job-title">{jobTitle}</p>
                <a 
                    href={websiteUrl}
                    className="person-website-link"
                >
                    {(firstName + " " + lastName).toLowerCase()} website
                </a>
                <div className="person-info-buttons-container">
                    <button className="btn-light">
                        <i className="btn-icon fa-solid fa-envelope"></i>
                        Email
                    </button>
                    <button className="btn-dark">
                        <i className="btn-icon fa-brands fa-linkedin"></i>
                        LinkedIn
                    </button>
                </div>
            </div>
        </header>
    )
}