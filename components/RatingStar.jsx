"use client"
import { BsFillStarFill } from "react-icons/bs";

const RatingStar = ({ rating }) => {
    const stars = new Array(rating).fill(0)
    return (
        <>
            {
                stars?.map((i, star) => (
                    <BsFillStarFill key={i} />
                ))
            }
        </>
    )
}

export default RatingStar
