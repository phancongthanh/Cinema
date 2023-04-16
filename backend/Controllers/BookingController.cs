using Cinema.Entities;
using Cinema.Exceptions;
using Cinema.Services;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly IBookingSystem _bookingSystem;

    public BookingController(IBookingSystem bookingSystem)
    {
        _bookingSystem = bookingSystem;
    }

    [HttpGet]
    public async Task<IEnumerable<Booking>> Get([FromQuery] string userId)
    {
        return await _bookingSystem.Get(userId);
    }

    [HttpPost("book")]
    public async Task<ActionResult<Booking>> Book([FromQuery] string userId, [FromQuery] int ticketId)
    {
        try
        {
            var bookingId = await _bookingSystem.Book(userId, ticketId);
            var booking = (await _bookingSystem.Get(userId)).Where(b => b.BookingId == bookingId).Single();
            return Ok(booking);
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("pay")]
    public async Task<ActionResult<Booking>> Pay([FromQuery] string userId, [FromQuery] int ticketId)
    {
        try
        {
            await _bookingSystem.Pay(userId, ticketId);
            var booking = (await _bookingSystem.Get(userId))
                .Where(b => b.TicketId == ticketId)
                .Where(b => b.CanceledTime == null)
                .Single();
            return Ok(booking);
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("cancel")]
    public async Task<ActionResult<Booking>> Cancel([FromQuery] string userId, [FromQuery] int ticketId)
    {
        try
        {
            await _bookingSystem.Cancel(userId, ticketId);
            var booking = (await _bookingSystem.Get(userId))
                .Where(b => b.TicketId == ticketId)
                .OrderByDescending(b => b.CanceledTime)
                .First();
            return Ok(booking);
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
    }
}
