import React, { useEffect, useState } from 'react'
import { getUsers, updateUser } from '../../Services/adminService';
import './UsersList.scss'

export default function UsersList(props) {
    const [users, setUsers] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        // getPhones(isMounted, setPhones, setError);
        updateUsersView();
        return () => { setIsMounted(false) }
    }, [isMounted]);

    if (error) {
        return <div>{error}</div>;
    }

    function updateUsersView() {
        getUsers()
            .then((result) => {
                setUsers(result);
            })
            .then((error) => {
                setError(error);
            })
    }

    async function updateRole(event, user, newRole) {
        event.preventDefault();
        event.stopPropagation();

        const data = {
            'id': user.id,
            'username': user.username,
            'fullname': user.fullname,
            'email': user.email,
            'role': newRole,
        }

        await updateUser(data);
        updateUsersView();
    }

    return (
        <div className="UsersList-container">
            <table>
                <thead>
                    <tr>
                        <th className="col-3">Username</th>
                        <th className="col-3">Fullname</th>
                        <th className="col-2">Email</th>
                        <th className="col-2">Role</th>
                        <th className="col-2">Change role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return <tr key={u.id}>
                            <td className="col-3">{u.username}</td>
                            <td className="col-3">{u.fullname}</td>
                            <td className="col-2">{u.email}</td>
                            <td className="col-2">{u.role}</td>
                            {
                                u.role === 'admin'
                                    ? <td className="col-2 link green" onClick={(event) => updateRole(event, u, 'user')}>
                                        Set to user <i className="fas fa-arrow-down"></i> </td>
                                    : <td className="col-2 link green" onClick={(event) => updateRole(event, u, 'admin')}>
                                        Set to admin <i className="fas fa-arrow-up"></i></td>
                            }
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}