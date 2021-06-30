import { getAccessToken, getUserId } from './userService'

export function getUsers() {
    const result = fetch('http://localhost:8080/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        }
    })
        .then(res => res.json())

    return result;
}

export function updateUser(data) {
    const result = fetch(`http://localhost:8080/api/users/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({userId: getUserId(), ...data})
    })
        .then(res => res.json())

    return result;
}