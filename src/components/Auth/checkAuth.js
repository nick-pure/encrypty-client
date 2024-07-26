const API_URL = 'http://127.0.0.1:8000/api/';

export const checkAuth = async () => {
    const response = await fetch(`${API_URL}profiles/check-auth/`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data.isAuthenticated;
    }
    return false;
};
