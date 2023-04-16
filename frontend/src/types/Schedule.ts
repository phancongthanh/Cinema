export default interface Schedule {
    getTime(): unknown;
    scheduleId: string,
    roomId: string,         // Tham chiếu phòng sử dụng của lần chiếu này
    filmId: string,         // Tham chiếu bộ phim được chiếu
    startTime: Date,        // Thời gian bắt đầu chiếu
    endTime: Date           // Thời gian kết thúc của lần chiếu này
}
