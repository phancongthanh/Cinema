import APIError from '../types/APIError';
import Film from '../types/Film';
import FilmDetail from '../types/FilmDetail';
import identity from './identity';
import server from './server';

/**
 * Lấy danh sách films của hệ thống
 * @returns Danh sách toàn bộ films : Film[]
 */
export async function get() : Promise<FilmDetail[]> {
    const url = server.basePath + "/Films";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) return [];
    const films: FilmDetail[] = await response.json();
    films.forEach(film => {
            film.schedules.forEach(schedule => {
                schedule.startTime = new Date(schedule.startTime);
                schedule.endTime = new Date(schedule.endTime);
            });
            film.schedules.sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
            film.releaseTime = film.schedules.length > 0 ? film.schedules[0].startTime : null;
        }
    );
    return films;
}

/**
 * Lấy thông tin film bằng id
 * @param filmId id của film cần lấy
 * @returns film nếu tồn tại, null nếu không tồn tại film
 */
export async function getById(filmId: string) : Promise<FilmDetail|null> {
    const url = server.basePath + "/Films/" + filmId;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) return null;
    const film: FilmDetail = await response.json();
    film.schedules.forEach(schedule => {
        schedule.startTime = new Date(schedule.startTime);
        schedule.endTime = new Date(schedule.endTime);
    })
    film.schedules.sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
    film.releaseTime = film.schedules.length > 0 ? film.schedules[0].startTime : null;
    return film;
}

/**
 * Thêm film
 * Film.filmId sẽ được server đổi
 * @param film dữ liệu của film
 * @returns film được thêm nếu thành công
 * @throws APIError
 */
export async function create(film: Film) : Promise<Film> {
    const url = server.basePath + "/Films";

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(film)
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
 * Cập nhật dữ liệu của film
 * @param film dữ liệu của film
 * @returns dữ liệu mới của film nếu thành công
 * @throws mã Http
 */
export async function update(film: Film) : Promise<Film> {
    const url = server.basePath + "/Films/" + film.filmId;

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(film)
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

const films = {
    get,
    getById,
    create,
    update
}

export default films;