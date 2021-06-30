export function authenticate(userData) {
    localStorage.setItem('userId', userData.user.id);
    localStorage.setItem('role', userData.user.role);
    localStorage.setItem('accessToken', userData.accessToken);
};

export function isAuthorized(role) {
    return localStorage.getItem('role') === role;
};

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function getUserId() {
    return localStorage.getItem('userId');
}

export function clearAuth() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
}

export async function loginService(data) {
    const result = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(
            (result) => {
                authenticate(result);
                return true;
            }
        )
        .catch((error) => {
            console.error('Error:', error);
            return false;
        });

    return result;
}