import LoginModel from '../types/LoginModel';
import RegisterModel from '../types/RegisterModel';
import identity from './identity';
import server from './server';

/**
 * Đăng ký tài khoản
 * @param account Tài khoản muốn đăng ký
 * @returns true nếu thành công
 */
export async function register(account: RegisterModel) : Promise<boolean> {
    const url = server.basePath + "/Account/Register";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    });

    return response.ok;
}

/**
 * Đăng nhập
 * @param request Thông tin đăng nhập
 * @returns true nếu thành công
 * @throws status (mã Http) của request
 */
export async function login(request: LoginModel) : Promise<boolean> {
    const url = server.basePath + "/Account/Login";
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    if (response.ok) {
        identity.setToken(await response.text(), request.rememberMe);
        return true;
    }
    throw response.status;
}

export async function logout() : Promise<void> {
    const url = server.basePath + "/Account/Logout";

    const token = identity.getToken();
    if (!token) return;

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

const accounts = {
    register,
    login,
    logout
}

export default accounts;