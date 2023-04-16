import jwtDecode, { JwtPayload } from 'jwt-decode';

const identity = {
    getToken: () => sessionStorage.getItem("token") || localStorage.getItem("token"),
    setToken: (token: string, rememberMe: boolean) => (rememberMe ? localStorage : sessionStorage).setItem("token", token),
    exp: () => {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) return null;
        const jwt = jwtDecode<JwtPayload>(token);
        return jwt.exp ? new Date(jwt.exp*1000) : null;
    },
    check: () => {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) return null;
        const jwt = jwtDecode<JwtPayload>(token);
        return jwt.exp && new Date(jwt.exp*1000) >= new Date();
    },
    getUserId: () => {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) return null;
        const jwt = jwtDecode<{ id: string}>(token);
        return jwt.id;
    },
    getRole: () => {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) return null;
        const jwt = jwtDecode<{ role: 'Admin'|'Manager'|'Member'}>(token);
        return jwt.role;
    }
}

export default identity;