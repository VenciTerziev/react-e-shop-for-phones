import { getAccessToken, getUserId } from "./userService";

export function getPhones() {
    const result = fetch('http://localhost:8080/api/phones', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())

    return result;
}

export function addPhone(data) {
    const result = fetch('http://localhost:8080/api/phones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({userId: getUserId(), ...data})
    })
        .then(res => res.json())

    return result;
}

export function updatePhone(data) {
    const result = fetch(`http://localhost:8080/api/phones/${data.id}`, {
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

export function deletePhone(id) {
    const result = fetch(`http://localhost:8080/api/phones/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        }
    })
        .then(res => res.json())

    return result;
}