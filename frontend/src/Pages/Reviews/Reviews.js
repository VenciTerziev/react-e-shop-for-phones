import React, { useEffect, useState } from 'react';
import { getReviews } from '../../Services/reviewService';
import { Link } from 'react-router-dom';
import './Reviews.scss';
import ReviewComponent from '../../Components/ReviewComponent/ReviewComponent';

export default function Reviews(props) {
    const [reviews, setReviews] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        getReviews()
            .then((result) => {
                setReviews(result);
            })
            .then((error) => {
                setError(error);
            })
        return () => { setIsMounted(false) }
    }, [isMounted]);

    if (error) {
        return <div>{ error }</div>;
    }

    return (
        <div className="Reviews-container">
            <h1>Reviews</h1>
            <div className="review-grid">
                {reviews.map(r =>  <Link to={`/review/${r.id}`} key={r.id}><ReviewComponent key={r.id} data={r}/></Link>)}
            </div>
        </div>
    )
}