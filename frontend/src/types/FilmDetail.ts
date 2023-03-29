import Schedule from './Schedule';

export default interface FilmDetail {
    filmId: string,
    title: string,          // Tên phim
    category: string,       // Thể loại
    description: string,    // Mô tả
    director: string|null,  // Đạo diễn
    actors: string|null,    // Diễn viên, các nhau bởi dấu ',' ví dụ: "Nguyễn A,Nguyễn B,Nguyễn B"
    language: string,       // Ngôn ngữ
    poster: string|null,
    trailer: string|null,
    tags: string,            // Tags để tìm kiếm
    schedules: Array<Schedule>
}