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

    // GET: api/Tickets
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
    {
      if (_context.Tickets == null)
      {
          return NotFound();
      }
        return await _context.Tickets.ToListAsync();
    }

    // GET: api/Tickets/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Ticket>> GetTicket(int id)
    {
      if (_context.Tickets == null)
      {
          return NotFound();
      }
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
        {
            return NotFound();
        }

        return ticket;
    }

    // PUT: api/Tickets/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTicket(int id, Ticket ticket)
    {
        if (id != ticket.TicketID)
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
            if (!TicketExists(id))
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

    // POST: api/Tickets
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
    {
      if (_context.Tickets == null)
      {
          return Problem("Entity set 'CinemaContext.Ticket'  is null.");
      }
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetTicket", new { id = ticket.TicketID }, ticket);
    }

    // DELETE: api/Tickets/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        if (_context.Tickets == null)
        {
            return NotFound();
        }
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TicketExists(int id)
    {
        return (_context.Tickets?.Any(e => e.TicketID == id)).GetValueOrDefault();
    }
}
