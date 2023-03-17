namespace Cinema.Entities;

public class Room
{
    public string RoomId { get; set; }

    public string Name { get; set; }

    public string Address { get; set; } = string.Empty;

    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();
}
