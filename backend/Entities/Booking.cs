using System.ComponentModel.DataAnnotations.Schema;

namespace Cinema.Entities;

public class Booking
{
    public int BookingId { get; set; }

    public string UserId { get; set; }

    public int TicketId { get; set; }

    public string ScheduleId { get; set; }

    public DateTime BookingTime { get; set; }

    public DateTime? PaymentTime { get; set; }

    public DateTime? CanceledTime { get; set; }

    [NotMapped]
    public bool Paid => PaymentTime != null;

    [NotMapped]
    public bool Canceled => CanceledTime != null;
}
