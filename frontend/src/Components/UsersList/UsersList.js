import React, { useEffect, useState } from 'react'
import { getUsers } from '../../Services/adminService';
import './UsersList.scss'

export default function UsersList(props) {
    const [users, setUsers] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        // getPhones(isMounted, setPhones, setError);
        getUsers()
            .then((result) => {
                setUsers(result);
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
        <div className="UsersList-container">
            <table>
                <thead>
                    <tr>
                        <th className="col-3">Username</th>
                        <th className="col-3">Fullname</th>
                        <th className="col-3">Email</th>
                        <th className="col-2">Promote</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return <tr key={u.username}>
                            <td className="col-3">{u.username}</td>
                            <td className="col-3">{u.fullname}</td>
                            <td className="col-2">{u.email}</td>
                            {
                                u.role === 'admin'
                                     ? <td className="col-2 link green">Set to user <i className="fas fa-arrow-down"></i> </td>
                                    : <td className="col-2 link green">Set to admin <i className="fas fa-arrow-up"></i></td>
                            }
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}