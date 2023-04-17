export const enum TicketStatus
{
    Available,  // Vừa được tạo
    Sold,       // Đâ bán chưa thanh toán
    Paid,       // Đã bán và thanh toán
    Canceled,   // Đã hủy
    Unavailable // Bị lỗi nên hủy
}

export default interface Ticket {
    id: number;
    ticketId: number,
    seatId: string,         // Tham chiếu ghế của vé này
    scheduleId: string,     // Tham chiếu lịch chiếu/suất chiếu
    cost: number,           // Giá vé
    userId: string|null,    // Người đã mua vé
    status: TicketStatus    // Trạng thái hiện tại của vé
}
