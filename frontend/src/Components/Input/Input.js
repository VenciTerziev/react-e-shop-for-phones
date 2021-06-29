import React from 'react'
import './Input.scss'

export default function Input(props) {
    return (
        <div className="input-holder">
            <label htmlFor={props.id}>{props.placeholder}</label>
            <input
                {...props}
                placeholder=""
            />
        </div>
    )
}