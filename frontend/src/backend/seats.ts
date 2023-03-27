import Room from '../types/Room';
import Seat from '../types/Seat';
import identity from './identity';
import server from './server';

/**
 * Thêm seat
 * Seat.seatId sẽ được server đổi
 * Chú ý seat.roomId cần tồn tại nếu không sẽ có lỗi 400
 * @param seat dữ liệu của seat
 * @returns thông tin room của seat sau khi thêm
 * @throws mã Http
 */
export async function create(seat: Seat) : Promise<Room> {
    const url = server.basePath + "/Seats?roomId=" + seat.roomId;

    const token = identity.getToken();
    if (!token) {
        console.warn("Thêm seat nhưng user chưa đăng nhập!");
        throw Number(401);
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(seat)
    });

    if (response.ok) return await response.json();
    throw response.status;
}

/**
 * Cập nhật dữ liệu của seat
 * Ghế phải tồn tại ứng đúng với roomId
 * @param seat dữ liệu của seat
 * @returns thông tin room của seat sau khi thêm
 * @throws mã Http
 */
export async function update(seat: Seat) : Promise<Room> {
    const url = server.basePath + "/Seats/" + seat.seatId;

    const token = identity.getToken();
    if (!token) {
        console.warn("Cập nhật seat nhưng user chưa đăng nhập!");
        throw Number(401);
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(seat)
    });

    if (response.ok) return await response.json();
    throw response.status;
}

/**
 * Khóa/Xóa ghế, cập nhật Seat.isAvailable thành false
 * Ghế phải tồn tại
 * @param seatId dữ liệu của seat
 * @returns thông tin room của seat sau khi thêm
 * @throws mã Http
 */
export async function remove(seatId: string) : Promise<Room> {
    const url = server.basePath + "/Seats/" + seatId;

    const token = identity.getToken();
    if (!token) {
        console.warn("Cập nhật seat nhưng user chưa đăng nhập!");
        throw Number(401);
    }

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) return await response.json();
    throw response.status;
}

const seats = {
    create,
    update,
    remove
}

export default seats;