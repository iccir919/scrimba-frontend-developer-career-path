import quoteUrl from "../../assets/images/quote.png"

export default function TestimonialContent({ 
    logoUrl,
    testimonial, 
    name, 
    position,
}) {

    const image = logoUrl ? 
        <img src={logoUrl} alt="Company Logo" className="logo-img" /> :
        <img src={quoteUrl} alt="Opening quote" className="quote-img" />   

    return (
        <div className="testimonial-content">
            {image}
            <blockquote className="testimonial-text">{testimonial}</blockquote>
            <div class="author">
                <strong>{name}</strong><br />
                <span>{position}</span>
            </div>
        </div> 
    )
}