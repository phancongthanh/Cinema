using Cinema.Data;
using Cinema.Entities;
using Cinema.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services;

public interface IBookingSystem
{
    Task<IEnumerable<Booking>> Get(string userId);

    Task<IEnumerable<Booking>> Get(int ticketId);

    Task<int> Book(string userId, int ticketId);

    Task Pay(string userId, int ticketId);

    Task Cancel(string userId, int ticketId);
}

public class BookingSystem : IBookingSystem
{
    private readonly CinemaContext _context;

    public BookingSystem(CinemaContext context)
    {
        _context = context;
    }

    public async Task<int> Book(string userId, int ticketId)
    {
        var ticket = await _context.Tickets
            .Where(t => t.TicketId == ticketId)
            .FirstOrDefaultAsync()
            ?? throw new NotFoundException("Vé không tồn tại!");
        switch (ticket.Status)
        {
            case TicketStatus.Available:
                {
                    ticket.Status = TicketStatus.Booked;
                    var booking = new Booking()
                    {
                        UserId = userId,
                        TicketId = ticketId,
                        ScheduleId = ticket.ScheduleId,
                        BookingTime = DateTime.Now
                    };
                    await _context.Bookings.AddAsync(booking);
                    await _context.SaveChangesAsync();
                    return booking.BookingId;
                }
            case TicketStatus.Booked: throw new InvalidOperationException("Vé đã được đặt!");
            case TicketStatus.Paid: throw new InvalidOperationException("Vé đã được đặt và thanh toán!");
            case TicketStatus.Canceled: throw new InvalidOperationException("Vé đã bị hủy!");
            case TicketStatus.Unavailable: throw new InvalidOperationException("Vé không hợp lệ!");
            default: throw new Exception();
        }
    }

    public async Task Cancel(string userId, int ticketId)
    {
        var ticket = await _context.Tickets
            .Where(t => t.TicketId == ticketId)
            .FirstOrDefaultAsync()
            ?? throw new NotFoundException("Vé không tồn tại!");
        if (ticket.UserId != null && ticket.UserId != userId)
            throw new InvalidOperationException("Vé được đặt bởi người khác!");
        switch (ticket.Status)
        {
            case TicketStatus.Available: throw new InvalidOperationException("Vé chưa được đặt!");
            case TicketStatus.Booked:
            case TicketStatus.Paid:
                {
                    ticket.Status = TicketStatus.Available;
                    var booking = await _context.Bookings
                        .Where(b => b.TicketId == ticketId)
                        .Where(b => b.UserId == userId)
                        .Where(b => b.CanceledTime == null)
                        .SingleOrDefaultAsync()
                        ?? throw new InvalidOperationException("Đã có người khác đặt vé!");
                    booking.CanceledTime = DateTime.Now;
                    await _context.SaveChangesAsync();
                    return;
                }
            case TicketStatus.Canceled: throw new InvalidOperationException("Vé đã bị hủy!");
            case TicketStatus.Unavailable: throw new InvalidOperationException("Vé không hợp lệ!");
            default: throw new Exception();
        }
    }

    public async Task<IEnumerable<Booking>> Get(string userId)
    {
        return await _context.Bookings.AsNoTracking()
            .Where(b => b.UserId == userId)
            .OrderBy(b => b.BookingTime)
            .ToListAsync();
    }

    public async Task<IEnumerable<Booking>> Get(int ticketId)
    {
        return await _context.Bookings.AsNoTracking()
            .Where(b => b.TicketId == ticketId)
            .OrderBy(b => b.BookingTime)
            .ToListAsync();
    }

    public async Task Pay(string userId, int ticketId)
    {
        var ticket = await _context.Tickets
            .Where(t => t.TicketId == ticketId)
            .FirstOrDefaultAsync()
            ?? throw new NotFoundException("Vé không tồn tại!");
        if (ticket.UserId != null && ticket.UserId != userId)
            throw new InvalidOperationException("Đã có người khác đặt vé!");
        switch (ticket.Status)
        {
            case TicketStatus.Available: throw new InvalidOperationException("Vé chưa được đặt!");
            case TicketStatus.Booked:
                {
                    ticket.Status = TicketStatus.Paid;
                    var booking = await _context.Bookings
                        .Where(b => b.TicketId == ticketId)
                        .Where(b => b.UserId == userId)
                        .Where(b => b.PaymentTime == null && b.CanceledTime == null)
                        .SingleOrDefaultAsync()
                        ?? throw new InvalidOperationException("Đã có người khác đặt vé!");
                    booking.PaymentTime = DateTime.Now;
                    await _context.SaveChangesAsync();
                    return;
                }
            case TicketStatus.Paid: throw new InvalidOperationException("Vé đã được đặt và thanh toán!");
            case TicketStatus.Canceled: throw new InvalidOperationException("Vé đã bị hủy!");
            case TicketStatus.Unavailable: throw new InvalidOperationException("Vé không hợp lệ!");
            default: throw new Exception();
        }
    }
}
