namespace Cinema.Entities;

public enum TicketStatus
{
    Available,
    Sold,
    Paid,
    Canceled,
    Unavailable
}

public class Ticket
{
    public int TicketId { get; set; }

    public string SeatId { get; set; }

    public string ScheduleId { get; set; }

    public double Cost { get; set; }

    public string? UserId { get; set; }

    public TicketStatus Status { get; set; } = TicketStatus.Available;
}
