export default interface Seat {
    seatId: string,
    roomId: string,         // Mã phòng để tham chiếu với bảng phòng
    position: string,       // Vị trí ghế, ví dụ: Ghế số 20, hàng 2 - cột 3
    row: number,            // Hàng ghế, ví dụ: 2
    column: number,         // Cột ghế, ví dụ: 3
    isVip: boolean,         // Loại ghế
    isAvailable: boolean    /* Ghế còn khả dụng không (Hiện còn dùng được không).
                                Vì không thể xóa ghế do tham chiếu các ticket nên isAvailable=false
                                nghĩa là xóa ghế này và không được sử dụng để tạo vé tự động nữa.*/
}
