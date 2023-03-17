namespace Cinema.Entities;

public class Schedule
{
    public string ScheduleId { get; set; }

    public string RoomId { get; set; }

    public string FilmId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
}
