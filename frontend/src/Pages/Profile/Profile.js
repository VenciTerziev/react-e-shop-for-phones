import React, { useEffect, useState } from 'react'
import Input from '../../Components/Input/Input'
import { getUserData, updateUser, getUserRole } from '../../Services/userService'
import './Profile.scss'

export default function Profile(props) {
    const [userData, setUserData] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        getUserData()
            .then((result) => {
                setUserData(result);
            })
            .then((error) => {
                setError(error);
            })
        return () => { setIsMounted(false) }
    }, [isMounted]);

    if (error) {
        return <div>{ error }</div>;
    }

    async function onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData(event.target);
        const data = {
            'username': userData.username,
            'fullname': formData.get('fullname'),
            'email': formData.get('email'),
            'role': getUserRole(),
        }

        console.log(data);

        await updateUser(data);
    }

    return (
        <div className="Profile-container">
            <h1>Welcome {userData.username}</h1>
            <p>Edit your data</p>
            <form id="profileForm" onSubmit={onSubmit}>
                <Input placeholder="Username" type="text" name="username" defaultValue={userData.username} 
                    className="disabled" disabled></Input>
                <Input placeholder="Fullname" type="text" name="fullname" defaultValue={userData.fullname} required></Input>
                <Input placeholder="Email" type="email" name="email" defaultValue={userData.email} required></Input>
                <input type="submit" className="button" placeholder="Save changes" value="Save changes"></input>
            </form>
        </div>
    )
}
