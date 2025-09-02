import TestimonialContent from "./TestimonialContent"

export default function TestominalWithoutImage({
    logoUrl="https://via.placeholder.com/150",
    testimonial,
    name,
    position
}) {
    return (
        <div className="testimonial without-image">
            <TestimonialContent
                logoUrl={logoUrl}
                testimonial={testimonial}
                name={name}
                position={position}
            />
        </div>
    )
}   