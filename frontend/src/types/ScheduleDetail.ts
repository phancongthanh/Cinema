import Film from './Film';
import Room from './Room';
import Ticket from './Ticket';

export default interface ScheduleDetail {
    scheduleId: string,
    room: Room,             // Phòng sử dụng của lần chiếu này
    film: Film,             // Bộ phim được chiếu
    startTime: Date,        // Thời gian bắt đầu chiếu
    endTime: Date           // Thời gian kết thúc của lần chiếu này
    tickets: Array<Ticket>
}