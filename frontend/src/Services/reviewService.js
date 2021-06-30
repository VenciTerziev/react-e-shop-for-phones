export function getReviews() {
    const result = fetch('http://localhost:8080/api/reviews', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json());

    return result;
}