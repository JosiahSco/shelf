import { jwtDecode } from 'jwt-decode';

export function isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        if (!exp) return false;
        return Date.now() < exp * 1000;
    } catch {
        return false;
    }
}