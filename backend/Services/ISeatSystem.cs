using Cinema.Data;
using Cinema.Entities;
using Cinema.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services;

public interface ISeatSystem
{
    Task<string> CreateSeat(Seat seat);

    Task UpdateSeat(Seat seat);

    Task<Seat> DeleteSeat(string seatId); 
}

public class SeatSystem : ISeatSystem
{
    private readonly CinemaContext _context;

    public SeatSystem(CinemaContext context)
    {
        _context = context;
    }

    public async Task<string> CreateSeat(Seat seat)
    {
        seat.SeatId = Guid.NewGuid().ToString();
        if (_context.Rooms.All(r => r.RoomId != seat.RoomId))
            throw new NotFoundException("Phòng không tồn tại!");
        await _context.Seats.AddAsync(seat);
        await _context.SaveChangesAsync();
        return seat.SeatId;
    }

    public async Task<Seat> DeleteSeat(string seatId)
    {
        var seat = await _context.Seats.FindAsync(seatId)
            ?? throw new NotFoundException("Ghế không tồn tại!");
        seat.IsAvailable = false;
        await _context.SaveChangesAsync();
        return seat;
    }

    public async Task UpdateSeat(Seat seat)
    {
        var oldSeat = await _context.Seats
            .Where(s => s.SeatId == seat.SeatId)
            .SingleOrDefaultAsync()
            ?? throw new NotFoundException("Ghế không tồn tại!");
        if (seat.RoomId != string.Empty && seat.RoomId != oldSeat.RoomId)
            throw new InvalidDataException("Phòng " + seat.RoomId + " không chứa ghế " + seat.SeatId);
        _context.Entry(seat).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}