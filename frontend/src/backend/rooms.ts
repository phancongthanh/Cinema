import APIError from '../types/APIError';
import Room from '../types/Room';
import identity from './identity';
import seats from './seats';
import server from './server';

/**
 * Lấy danh sách rooms của hệ thống
 * @returns Danh sách toàn bộ rooms : Room[]
 */
export async function get() : Promise<Room[]> {
    const url = server.basePath + "/Rooms";

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
 * Lấy thông tin room bằng id
 * @param roomId id của room cần lấy
 * @returns room nếu tồn tại, null nếu không tồn tại room
 */
export async function getById(roomId: string) : Promise<Room|null> {
    const url = server.basePath + "/Rooms/" + roomId;

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
 * Thêm room
 * Room.roomId sẽ được server đổi
 * Các seatId của Room.seats cũng được server sinh tự động
 * @param room dữ liệu của room
 * @returns room được thêm nếu thành công
 * @throws APIError
 */
export async function create(room: Room) : Promise<Room> {
    const url = server.basePath + "/Rooms";

    const token = identity.getToken();
    if (!token) {
        console.warn("Thêm room nhưng user chưa đăng nhập!");
        throw Number(401);
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(room)
    });

    if (response.ok) return await response.json();
    
    const error:APIError = {
        status: response.status,
        response: response,
        message: ""
    }
    switch (response.status) {
        case 400: error.message = await response.text(); throw error;
        case 401: error.message = "Người dùng chưa đăng nhập"; throw error;
        case 403: error.message = "Người dùng không có quyền thực hiện"; throw error;
        default: throw error;
    }
}

/**
 * Cập nhật dữ liệu của room
 * Chú ý danh sách ghế Room.seats phải bao gồm các ghế cũ (không được phép xóa ghế hay thay đổi id ghế),
 * Các ghế được thêm mới sẽ có seatId được server sinh tự động
 * @param room dữ liệu của room
 * @returns dữ liệu mới của room nếu thành công
 * @throws APIError
 */
export async function update(room: Room) : Promise<Room> {
    const url = server.basePath + "/Rooms/" + room.roomId;

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(room)
    });

    if (response.ok) return await response.json();
    
    const error:APIError = {
        status: response.status,
        response: response,
        message: ""
    }
    switch (response.status) {
        case 400: error.message = await response.text(); throw error;
        case 401: error.message = "Người dùng chưa đăng nhập"; throw error;
        case 403: error.message = "Người dùng không có quyền thực hiện"; throw error;
        default: throw error;
    }
}

const rooms = {
    get,
    getById,
    create,
    update,
    seats
}

export default rooms;