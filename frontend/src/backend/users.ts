import User from '../types/User';
import identity from './identity';
import server from './server';

/**
 * Lấy danh sách users của hệ thống
 * @returns Danh sách toàn bộ users : User[]
 */
export async function get() : Promise<User[]> {
    const url = server.basePath + "/Users";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) return [];
    return await response.json();
}

/**
 * Lấy thông tin user bằng id
 * @param userId id của user cần lấy
 * @returns user nếu tồn tại, null nếu không tồn tại user
 */
export async function getById(userId: string) : Promise<User|null> {
    const url = server.basePath + "/Users/" + userId;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) return null;
    return await response.json();
}

/**
 * Cập nhật dữ liệu của user
 * @param user dữ liệu của user
 * @returns true nếu thành công
 */
export async function update(user: User) : Promise<boolean> {
    const url = server.basePath + "/Users/" + user.id;

    const token = identity.getToken();
    if (!token) {
        console.warn("Cập nhật user nhưng chưa đăng nhập!");
        return false;
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(user)
    });

    return response.ok;
}

const users = {
    get,
    getById,
    update
}

export default users;