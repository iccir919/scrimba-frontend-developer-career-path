import TestimonialContent from "./TestimonialContent"
import useWindowSize from "../../hooks/useWindowSize"


export default function TestominalWithImage({
    smallImgUrl="https://via.placeholder.com/100",
    largeImgUrl="https://via.placeholder.com/300",
    testimonial,
    name,
    position
}) {    
    const { width } = useWindowSize();
    const imgUrl = width < 768 ? smallImgUrl : largeImgUrl;

    return (
        <div className="testimonial with-image">
            <div className="testimonial-image">
                <img 
                    src={imgUrl} 
                    alt={name} 
                />
            </div>
           <TestimonialContent
                testimonial={testimonial}
                name={name}
                position={position}
           />
        </div>
    )
}   