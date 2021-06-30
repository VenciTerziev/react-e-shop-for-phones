import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getReview } from '../../Services/reviewService';
import './Review.scss'

export default function Review(props) {
    const [review, setReview] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);
    const { reviewId } = useParams();

    useEffect(() => {
        setIsMounted(true);
        // getPhones(isMounted, setPhones, setError);
        getReview(reviewId)
            .then((result) => {
                setReview(result);
            })
            .then((error) => {
                setError(error);
            })
        return () => { setIsMounted(false) }
    }, [isMounted, reviewId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="Review-container">
            <h3>{review.title}</h3>
            <p>{review.postedOn}</p>
            <b>{review.description}</b>
        </div>
    )
}