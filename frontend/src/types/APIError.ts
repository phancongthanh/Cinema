export default interface APIError {
    status: number,     // Mã lỗi
    response: Response, // Response mà fetch trả về, không khuyến khích sử dụng field này
    message: string     // Thông báo lỗi đi kèm
}