import APIError from '../types/APIError';
import Booking from '../types/Booking';
import identity from './identity';
import server from './server';

const ticket = {
    book,
    pay,
    cancel,
    getBookingOfUser
}

export default ticket;

/**
 * Lấy danh sách các lần bookings của người dùng userId
 * @param userId Id người dùng
 * @returns Danh sách toàn bộ bookings : Booking[] của người dùng userId
 */
export async function getBookingOfUser(userId: string) : Promise<Booking[]> {
    const url = server.basePath + "/Booking?userId=" + userId;

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (!response.ok) return [];
    const bookings: Booking[] = await response.json();
    bookings.forEach(b => {
        b.bookingTime = new Date(b.bookingTime);
        if (b.paymentTime != null) b.paymentTime = new Date(b.paymentTime);
        if (b.canceledTime != null) b.canceledTime = new Date(b.canceledTime);
    });
    return bookings;
}

/**
 * Người dùng userId đặt vé ticketId
 * Vé này chưa ai đặt (status = available)
 * Người này chưa đặt vé này
 * @param userId Id người đặt
 * @param ticketId Id vé muốn đặt
 * @returns Thông tin đặt vé trong đối tượng Booking
 * @throws APIError
 */
export async function book(userId: string, ticketId: number) : Promise<Booking> {
    const url = server.basePath + "/Booking/book"
        + "?userId=" + userId
        + "&ticketId=" + ticketId;

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) {
        const booking:Booking = await response.json();
        booking.bookingTime = new Date(booking.bookingTime);
        if (booking.paymentTime != null) booking.paymentTime = new Date(booking.paymentTime);
        if (booking.canceledTime != null) booking.canceledTime = new Date(booking.canceledTime);
        return booking;
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
 * Người dùng userId thanh toán vé ticketId đã đặt
 * Vé này đang được người dùng này đặt
 * Người này đặt vé và chưa thanh toán
 * @param userId Id người đặt
 * @param ticketId Id vé muốn thanh toán
 * @returns Thông tin đặt vé trong đối tượng Booking
 * @throws APIError
 */
export async function pay(userId: string, ticketId: number) : Promise<Booking> {
    const url = server.basePath + "/Booking/pay"
        + "?userId=" + userId
        + "&ticketId=" + ticketId;

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) {
        const booking:Booking = await response.json();
        booking.bookingTime = new Date(booking.bookingTime);
        if (booking.paymentTime != null) booking.paymentTime = new Date(booking.paymentTime);
        if (booking.canceledTime != null) booking.canceledTime = new Date(booking.canceledTime);
        return booking;
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
 * Người dùng userId hủy vé ticketId
 * Vé này phải đang được người này đặt (hoặc đã đặt và thanh toán)
 * @param userId Id người đặt
 * @param ticketId Id vé
 * @returns Thông tin đặt vé trong đối tượng Booking
 * @throws APIError
 */
export async function cancel(userId: string, ticketId: number) : Promise<Booking> {
    const url = server.basePath + "/Booking/cancel"
        + "?userId=" + userId
        + "&ticketId=" + ticketId;

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) {
        const booking:Booking = await response.json();
        booking.bookingTime = new Date(booking.bookingTime);
        if (booking.paymentTime != null) booking.paymentTime = new Date(booking.paymentTime);
        if (booking.canceledTime != null) booking.canceledTime = new Date(booking.canceledTime);
        return booking;
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