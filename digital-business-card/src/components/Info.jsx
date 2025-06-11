export default function Info(props) {
    const { 
        firstName, 
        lastName,
        emailAddress,
        jobTitle,
        linkedIn,
        websiteUrl 
    } = props.personInfo
    return (
        <header className="info-section-container">
            <img 
                className="person-img"
                src={props.personImgUrl}  
            />
            <div className="person-info-details-container">
                <h1 className="person-name">{firstName} {lastName}</h1>
                <p className="job-title">{jobTitle}</p>
                <a 
                    target="_blank"
                    href={websiteUrl}
                    className="person-website-link"
                >
                    {(firstName + " " + lastName).toLowerCase()} website
                </a>
                <div className="person-info-buttons-container">
                    <a href={`mailto:${emailAddress}`}>
                        <button className="info-btn btn-light" type="button">
                            <i className="btn-icon fa-solid fa-envelope"></i>
                            Email
                        </button>
                    </a>
                    <a href={linkedIn} target="_blank">
                        <button className="info-btn btn-dark" type="button">
                            <i className="btn-icon fa-brands fa-linkedin"></i>
                            LinkedIn
                        </button>
                    </a>
                </div>
            </div>
        </header>
    )
}