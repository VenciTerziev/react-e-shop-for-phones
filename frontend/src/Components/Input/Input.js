import React from 'react'
import './Input.scss'

export default function Input(props) {
    return (
        <div className="input-holder">
            <label htmlFor={props.id}>{props.placeholder}</label>
            { props.type === "textarea" ?
                 <textarea
                 {...props}
                 placeholder=""
                ></textarea>
                :
                <input
                    {...props}
                    placeholder=""
                />
            }
        </div>
    )
}