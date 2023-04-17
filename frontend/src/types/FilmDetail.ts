import Schedule from './Schedule';

export default interface FilmDetail {
    filmId: string,
    title: string,          // Tên phim
    category: string,       // Thể loại
    description: string,    // Mô tả
    director: string|null,  // Đạo diễn
    actors: string|null,    // Diễn viên, các nhau bởi dấu ',' ví dụ: "Nguyễn A,Nguyễn B,Nguyễn B"
    time: number            // Thời gian chiếu
    releaseTime: Date|null,      // Thời gian khởi chiếu, null là không có thời gian chiếu
    country: string,        // Xuất sứ
    poster: string|null,
    trailer: string|null,
    schedules: Array<Schedule>
}