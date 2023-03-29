using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinema.Data;
using Cinema.Entities;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TicketsController : ControllerBase
{
    private readonly CinemaContext _context;

    public TicketsController(CinemaContext context)
    {
        _context = context;
    }

    // PUT: api/Tickets/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTicket([FromRoute] int id, [FromBody] Ticket ticket)
    {
        if (id != ticket.TicketId)
        {
            return BadRequest();
        }

        _context.Entry(ticket).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Tickets.Any(t => t.TicketId == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
}
