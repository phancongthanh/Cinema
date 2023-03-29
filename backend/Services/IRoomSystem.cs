using Cinema.Data;
using Cinema.Entities;
using Cinema.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services;

public interface IRoomSystem
{
    Task<Room?> GetRoom(string roomId);

    Task<IEnumerable<Room>> GetRooms();

    Task<string> CreateRoom(Room room);

    Task UpdateRoom(Room room);

    Task<bool> RoomExists(string roomId);
}

public class RoomSystem : IRoomSystem
{
    private readonly CinemaContext _context;

    public RoomSystem(CinemaContext context)
    {
        _context = context;
    }

    public async Task<string> CreateRoom(Room room)
    {
        room.RoomId = Guid.NewGuid().ToString();
        foreach (var seat in room.Seats)
        {
            seat.RoomId = room.RoomId;
            if (string.IsNullOrWhiteSpace(seat.SeatId))
                seat.SeatId = Guid.NewGuid().ToString();
        }

        await _context.Rooms.AddAsync(room);
        await _context.SaveChangesAsync();

        return room.RoomId;
    }

    public async Task<Room?> GetRoom(string roomId)
    {
        if (_context.Rooms == null) return null;
        return await _context.Rooms
            .Include(r => r.Seats)
            .AsNoTracking()
            .Where(r => r.RoomId == roomId)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Room>> GetRooms()
    {
        if (_context.Rooms == null) return Array.Empty<Room>();
        return await _context.Rooms
            .AsNoTracking()
            .Include(r => r.Seats)
            .ToListAsync();
    }

    public async Task<bool> RoomExists(string roomId)
    {
        return await _context.Rooms.AnyAsync(r => r.RoomId == roomId);
    }

    public async Task UpdateRoom(Room room)
    {
        // Kiểm tra sự tồn tại của phòng
        if (!await RoomExists(room.RoomId))
            throw new NotFoundException("Phòng không tồn tại!");
        // Hợp lệ các seats trong room
        foreach (var seat in room.Seats)
        {
            if (seat.RoomId != room.RoomId)
                seat.RoomId = room.RoomId;
            if (string.IsNullOrWhiteSpace(seat.SeatId))
                seat.SeatId = Guid.NewGuid().ToString();
        }

        // Thêm các seats không tồn tại
        var seatIds = await _context.Seats.Where(s => s.RoomId == room.RoomId).Select(s => s.SeatId).ToListAsync();
        var seats = room.Seats.Where(s => !seatIds.Contains(s.SeatId)).ToList();
        await _context.Seats.AddRangeAsync(seats);
        // Cập nhật các seats đã có
        seats = room.Seats.Where(s => seatIds.Contains(s.SeatId)).ToList();
        foreach (var seat in seats) _context.Entry(seat).State = EntityState.Modified;
        // Cập nhật phòng
        _context.Entry(room).State = EntityState.Modified;

        await _context.SaveChangesAsync();
    } 
}