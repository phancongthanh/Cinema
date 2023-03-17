namespace Cinema.Entities;

public enum TicketStatus
{

}

public class Ticket
{
    public int TicketID { get; set; }

    public string SeatId { get; set; }

    public string ScheduleId { get; set; }

    public string? UserId { get; set; }

    public TicketStatus Status { get; set; }
}
