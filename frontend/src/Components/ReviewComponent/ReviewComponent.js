import React from 'react'
import './ReviewComponent.scss'

export default function ReviewComponent(props) {
    return (
        <div className="review-holder">
                <h3>{props.data.title}</h3>
                <div>{props.data.postedOn}</div>
                <p>{props.data.shortDescription}</p>
        </div>
    )
}