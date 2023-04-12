namespace Cinema.Entities;

public class Seat
{
    public string SeatId { get; set; }

    public string RoomId { get; set; }

    public string Position { get; set; } = string.Empty;

    public int Row { get; set; }

    public int Column { get; set; }

    public bool IsVip { get; set; }

    public bool IsAvailable { get; set; } = true;
}
