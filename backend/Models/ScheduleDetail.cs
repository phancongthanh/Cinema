using Cinema.Entities;

namespace Cinema.Models;

public class ScheduleDetail
{
    public string ScheduleId { get; set; }

    public Room Room { get; set; }

    public Film Film { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public IEnumerable<Ticket> Tickets { get; set; }
}
