import React, { useEffect, useState } from 'react'
import { getPhones } from '../../Services/phoneService';
import './PhonesList.scss'

export default function PhonesList(props) {
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
        <div className="PhonesList-container">
            <table>
                <thead>
                    <tr>
                        <th className="col-3">Name</th>
                        <th className="col-3">Description</th>
                        <th className="col-2">Price</th>
                        <th className="col-2">Edit</th>
                        <th className="col-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map(p => {
                        return <tr key={p.username}>
                            <td className="col-3">{p.name}</td>
                            <td className="col-3">{p.description}</td>
                            <td className="col-2">{p.price}</td>
                            <td className="col-2 link green">Edit <i class="fas fa-edit"></i> </td>  
                            <td className="col-2 link red">Delete <i class="fas fa-trash-alt"></i></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}