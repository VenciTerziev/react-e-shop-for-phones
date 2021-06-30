import React, { useEffect, useState } from 'react'
import { getPhones } from '../../Services/phoneService';
import './Phones.scss'
import PhoneComponent from '../../Components/PhoneComponent/PhoneComponent';
import { Link } from "react-router-dom";

export default function Phones(props) {
    const [phones, setPhones] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        // getPhones(isMounted, setPhones, setError);
        getPhones()
            .then((result) => {
                setPhones(result);
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
        <div className="Phones-container">
            <h1>Phones</h1>
            <div className="phone-grid">
                {phones.map(p =>  <Link to={`/phone/${p.id}`} key={p.id}><PhoneComponent data={p}/></Link> )}
            </div>
        </div>
    )
}