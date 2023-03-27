import Film from '../types/Film';
import identity from './identity';
import server from './server';

/**
 * Lấy danh sách films của hệ thống
 * @returns Danh sách toàn bộ films : Film[]
 */
export async function get() : Promise<Film[]> {
    const url = server.basePath + "/Films";

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
 * Lấy thông tin film bằng id
 * @param filmId id của film cần lấy
 * @returns film nếu tồn tại, null nếu không tồn tại film
 */
export async function getById(filmId: string) : Promise<Film|null> {
    const url = server.basePath + "/Films/" + filmId;

    const token = identity.getToken();
    if (!token) {
        console.warn("Thêm film nhưng user chưa đăng nhập!");
        throw Number(401);
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (!response.ok) return null;
    return await response.json();
}

/**
 * Thêm film
 * Film.filmId sẽ được server đổi
 * @param film dữ liệu của film
 * @returns film được thêm nếu thành công
 * @throws mã Http
 */
export async function create(film: Film) : Promise<Film> {
    const url = server.basePath + "/Films";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(film)
    });

    if (response.ok) return await response.json();
    throw response.status;
}

/**
 * Cập nhật dữ liệu của film
 * @param film dữ liệu của film
 * @returns dữ liệu mới của film nếu thành công
 * @throws mã Http
 */
export async function update(film: Film) : Promise<Film> {
    const url = server.basePath + "/Films/" + film.filmId;

    const token = identity.getToken();
    if (!token) {
        console.warn("Cập nhật film nhưng user chưa đăng nhập!");
        throw Number(401);
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(film)
    });

    if (response.ok) return await response.json();
    throw response.status;
}

const films = {
    get,
    getById,
    create,
    update
}

export default films;