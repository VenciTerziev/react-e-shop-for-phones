import { getAccessToken, getUserId } from "./userService";

export function getReviews() {
    const result = fetch('http://localhost:8080/api/reviews', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())

    return result;
}

export function getReview(id) {
    const result = fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())

    return result;
}

export function addReview(data) {
    const result = fetch('http://localhost:8080/api/reviews', {
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

export function updateReview(data) {
    const result = fetch(`http://localhost:8080/api/reviews/${data.id}`, {
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

export function deleteReview(id) {
    const result = fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        }
    })
        .then(res => res)

    return result;
}