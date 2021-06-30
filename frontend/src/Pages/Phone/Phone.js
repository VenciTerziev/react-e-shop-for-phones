import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getPhone } from '../../Services/phoneService';
import './Phone.scss'

export default function Phones(props) {
    const [phone, setPhone] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);
    const { phoneId } = useParams();

    useEffect(() => {
        setIsMounted(true);
        // getPhones(isMounted, setPhones, setError);
        getPhone(phoneId)
            .then((result) => {
                setPhone(result);
            })
            .then((error) => {
                setError(error);
            })
        return () => { setIsMounted(false) }
    }, [isMounted, phoneId]);

    if (error) {
        return <div>{ error }</div>;
    }

    return (
        <div className="Phone-container">
            <div className="left">
                <img src={phone.defaultImage} alt={phone.description} />
            </div>
            <div className="right">
                <h3>{phone.name}</h3>
                <p>{phone.description}</p>
                <b>{phone.price} лв.</b>
                <button className="button">Добави в количка</button>
            </div>
        </div>
    )
}