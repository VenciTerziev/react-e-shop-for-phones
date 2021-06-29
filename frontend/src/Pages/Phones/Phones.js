import React, { useEffect, useState } from 'react'
import { getPhones } from '../../Services/phoneService';
import './Phones.scss'
import PhoneComponent from '../../Components/PhoneComponent/PhoneComponent';

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
                {phones.map(p => <PhoneComponent key={p.id} data={p}/>)}
            </div>
        </div>
    )
}

// function getPhones(isMounted, setIsLoaded, setCourses, setError) {

    
//     send({
//         url: 'http://localhost:8080/api/courses',
//         method: 'GET',
//         headers: new Headers({
//             'Authorization': `Bearer ${getAccessToken()}`
//         }),
//         data: null,
//         expectedStatusCode: 200
//     }, (result) => {
//         if (isMounted) {
//             setCourses(result);
//             setIsLoaded(true);
//         }
//     }, (error) => {
//         if (isMounted) {
//             setError(error);
//             setIsLoaded(true);
//         }
//     })
// }