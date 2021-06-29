export function getPhones() {
    const result = fetch('http://localhost:8080/api/phones', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        // .then(
        //     (result) => {
        //         return result;
        //     },
        //     (error) => {
        //         return error;
        //     }
        // );

    return result;
}