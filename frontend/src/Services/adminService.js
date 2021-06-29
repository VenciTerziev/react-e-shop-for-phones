import { getAccessToken } from './userService'

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