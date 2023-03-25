import Seat from './Seat';

export default interface Room {
    roomId: string,
    name: string,       // Tên phòng, ví dụ: Phòng chiếu số 1
    address: string,    // Địa chỉ, ví dụ: Tầng 1, phòng 101
    seats: Array<Seat>  // Danh sách ghế trong phòng
}
