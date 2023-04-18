import APIError from '../types/APIError';
import Schedule from '../types/Schedule';
import ScheduleDetail from '../types/ScheduleDetail';
import identity from './identity';
import server from './server';
import ticket from './ticket';

const schedules = {
    get,
    getById,
    create,
    update,
    ticket
}

export default schedules;

/**
 * Lấy danh sách schedules của hệ thống
 * @returns Danh sách toàn bộ schedules : Schedule[]
 */
export async function get() : Promise<Schedule[]> {
    const url = server.basePath + "/Schedules";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) return [];
    const schedules: Schedule[] = await response.json();
    schedules.forEach(s => {
        s.startTime = new Date(s.startTime);
        s.endTime = new Date(s.endTime);
    });
    return schedules;
}

/**
 * Lấy thông tin chi tiết của 1 schedule bằng id
 * @param scheduleId id của schedule cần lấy
 * @returns schedule nếu tồn tại, null nếu không tồn tại schedule
 */
export async function getById(scheduleId: string) : Promise<ScheduleDetail|null> {
    const url = server.basePath + "/Schedules/" + scheduleId;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) return null;
    const schedule:ScheduleDetail = await response.json();
    schedule.startTime = new Date(schedule.startTime);
    schedule.endTime = new Date(schedule.endTime);
    return schedule;
}

/**
 * Thêm schedule
 * Schedule.scheduleId sẽ được server đổi
 * Server sẽ tự tạo danh sách tickets từ các seat trong schedule.roomId
 * Nếu film hoặc room không tồn tại sẽ có lỗi 400
 * @param schedule dữ liệu của schedule
 * @param baseCost Giá vé của những ghế thường
 * @param vipCost Giá vé của những ghế vip
 * @returns schedule được thêm nếu thành công
 * @throws APIError
 */
export async function create(schedule: Schedule, baseCost: number, vipCost: number) : Promise<ScheduleDetail> {
    schedule.startTime = new Date(new Date(schedule.startTime).getTime() + 7*60*60*1000)
    schedule.endTime = new Date(new Date(schedule.endTime).getTime() + 7*60*60*1000)
    const url = server.basePath + "/Schedules"
        + "?baseCost=" + baseCost
        + "&vipCost=" + vipCost;
    
    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(schedule)
    });

    if (response.ok) {
        const detail:ScheduleDetail = await response.json();
        detail.startTime = new Date(detail.startTime);
        detail.endTime = new Date(detail.endTime);
        return detail;
    }
    
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
 * Cập nhật thời gian chiếu của schedule
 * @param scheduleId Id của schedule
 * @param startTime Thời gian bắt đầu của lần chiếu
 * @param endTime Thời gian kết thúc của lần chiếu
 * @returns dữ liệu mới của schedule nếu thành công
 * @throws APIError
 */
export async function update(scheduleId: string, startTime: Date, endTime: Date) : Promise<ScheduleDetail> {
    startTime = new Date(new Date(startTime).getTime() + 7*60*60*1000)
    endTime = new Date(new Date(endTime).getTime() + 7*60*60*1000)
    const url = server.basePath + "/Schedules/" + scheduleId
        + "?startTime=" + startTime.toISOString()
        + "&endTime=" + endTime.toISOString();

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({scheduleId, filmId: "", roomId: "", startTime, endTime})
    });

    if (response.ok) {
        const schedule:ScheduleDetail = await response.json();
        schedule.startTime = new Date(schedule.startTime);
        schedule.endTime = new Date(schedule.endTime);
        return schedule;
    }
    
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