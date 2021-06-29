import React from 'react'
import './PhoneComponent.scss'

export default function PhoneComponent(props) {
    return (
        <div className="phone-holder">
            <div className="image-holder">
                <img alt={props.data.description} src={props.data.defaultImage} />
            </div>
            <div className="texts-holder">
                <h3>{props.data.name}</h3>
                <p>{props.data.description}</p>
                <b>{props.data.price} лв.</b>
            </div>
        </div>
    )
}