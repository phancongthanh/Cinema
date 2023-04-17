using Cinema.Data;
using Cinema.Entities;
using Cinema.Exceptions;
using Cinema.Models;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services;

public interface IScheduleSystem
{
    Task<IEnumerable<Schedule>> GetSchedules();

    Task<ScheduleDetail?> GetSchedule(string scheduleId);

    Task<string> CreateSchedule(Schedule schedule, double baseCost, double vipCost);

    Task UpdateSchedule(string scheduleId, DateTime startTime, DateTime endTime);
}

public class ScheduleSystem : IScheduleSystem
{
    private readonly CinemaContext _context;

    public ScheduleSystem(CinemaContext context)
    {
        _context = context;
    }

    public async Task<string> CreateSchedule(Schedule schedule, double baseCost, double vipCost)
    {
        schedule.ScheduleId = Guid.NewGuid().ToString();
        var room = await _context.Rooms.Include(r => r.Seats)
            .Where(r => r.RoomId == schedule.RoomId)
            .SingleOrDefaultAsync()
            ?? throw new NotFoundException("Phòng chiếu không tồn tại!");
        if (!_context.Films.Any(f => f.FilmId == schedule.FilmId))
            throw new NotFoundException("Phim không tồn tại!");
        await _context.Schedules.AddAsync(schedule);
        foreach (var seat in room.Seats)
        {
            var ticket = new Ticket()
            {
                TicketId = 0,
                ScheduleId = schedule.ScheduleId,
                SeatId = seat.SeatId,
                Cost = seat.IsVip ? vipCost : baseCost,
                UserId = null,
                Status = seat.IsAvailable ? TicketStatus.Available : TicketStatus.Unavailable
            };
            await _context.Tickets.AddAsync(ticket);
        }
        await _context.SaveChangesAsync();
        return schedule.ScheduleId;
    }

    public async Task<ScheduleDetail?> GetSchedule(string scheduleId)
    {
        var schedule = await _context.Schedules.FindAsync(scheduleId);

        if (schedule == null)
            return null;

        var room = await _context.Rooms.AsNoTracking()
            .Include(r => r.Seats).AsNoTracking()
            .Where(r => r.RoomId == schedule.RoomId)
            .SingleOrDefaultAsync();
        var film = await _context.Films.FindAsync(schedule.FilmId);

        if (room == null || film == null) throw new InvalidDataException();

        var tickets = await _context.Tickets.AsNoTracking()
            .Where(t => t.ScheduleId == scheduleId)
            .ToListAsync();

        return new ScheduleDetail()
        {
            ScheduleId = scheduleId,
            StartTime = schedule.StartTime,
            EndTime = schedule.EndTime,
            Room = room,
            Film = film,
            Tickets = tickets
        };
    }

    public async Task<IEnumerable<Schedule>> GetSchedules()
    {
        return await _context.Schedules.AsNoTracking().ToListAsync();
    }

    public async Task UpdateSchedule(string scheduleId, DateTime startTime, DateTime endTime)
    {
        var schedule = await _context.Schedules.FindAsync(scheduleId)
            ?? throw new NotFoundException("Schedule không tồn tại!");
        schedule.StartTime = startTime;
        schedule.EndTime = endTime;
        await _context.SaveChangesAsync();
    }
}