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
                <h1 className="personName">{firstName} {lastName}</h1>
                <p className="jobTitle">{jobTitle}</p>
                <a 
                    href={websiteUrl}
                    className="wesbiteLink"
                >
                    {(firstName + " " + lastName).toLowerCase()} website
                </a>
            </div>
            <div className="person-info-buttons-container">
                <button>Email</button>
                <button>LinkedIn</button>
            </div>
        </header>
    )
}