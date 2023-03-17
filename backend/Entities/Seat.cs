namespace Cinema.Entities;

public class Seat
{
    public string SeatId { get; set; }

    public string RoomId { get; set; }

    public int Number { get; set; }

    public string Position { get; set; } = string.Empty;

    public bool IsVip { get; set; }

    public bool IsAvailable { get; set; } = true;
}
