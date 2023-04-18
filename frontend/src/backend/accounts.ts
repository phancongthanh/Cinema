import APIError from '../types/APIError';
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
 * @throws APIError object
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
    const error:APIError = {
        status: response.status,
        response: response,
        message: response.status === 400 ? await response.text() : ""
    }
    throw error;
}

/**
 * Đăng nhập
 * @param userId Id người dùng cần đổi
 * @param old mật khẩu cũ
 * @param password mật khẩu mới
 * @returns true nếu thành công
 * @throws APIError object
 */
export async function changePassword(userId: string, old: string, password: string) : Promise<boolean> {
    const url = server.basePath + "/Account/ChangePassword"
        + "?userId=" + userId
        + "&old=" + old
        + "&password=" + password;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: password
    });

    if (response.ok) return true;

    const error:APIError = {
        status: response.status,
        response: response,
        message: response.status === 400 ? await response.text() : ""
    }
    throw error;
}

export async function logout() : Promise<void> {
    const url = server.basePath + "/Account/Logout";

    const token = identity.getToken();
    if (!token) return;
    sessionStorage.clear();
    localStorage.clear();
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
    changePassword,
    logout
}

export default accounts;