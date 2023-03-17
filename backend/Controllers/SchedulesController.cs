using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinema.Data;
using Cinema.Entities;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SchedulesController : ControllerBase
{
    private readonly CinemaContext _context;

    public SchedulesController(CinemaContext context)
    {
        _context = context;
    }

    // GET: api/Schedules
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedule()
    {
      if (_context.Schedules == null)
      {
          return NotFound();
      }
        return await _context.Schedules.ToListAsync();
    }

    // GET: api/Schedules/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Schedule>> GetSchedule(string id)
    {
      if (_context.Schedules == null)
      {
          return NotFound();
      }
        var schedule = await _context.Schedules.FindAsync(id);

        if (schedule == null)
        {
            return NotFound();
        }

        return schedule;
    }

    // PUT: api/Schedules/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSchedule(string id, Schedule schedule)
    {
        if (id != schedule.ScheduleId)
        {
            return BadRequest();
        }

        _context.Entry(schedule).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ScheduleExists(id))
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

    // POST: api/Schedules
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Schedule>> PostSchedule(Schedule schedule)
    {
      if (_context.Schedules == null)
      {
          return Problem("Entity set 'CinemaContext.Schedule'  is null.");
      }
        _context.Schedules.Add(schedule);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (ScheduleExists(schedule.ScheduleId))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetSchedule", new { id = schedule.ScheduleId }, schedule);
    }

    // DELETE: api/Schedules/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSchedule(string id)
    {
        if (_context.Schedules == null)
        {
            return NotFound();
        }
        var schedule = await _context.Schedules.FindAsync(id);
        if (schedule == null)
        {
            return NotFound();
        }

        _context.Schedules.Remove(schedule);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ScheduleExists(string id)
    {
        return (_context.Schedules?.Any(e => e.ScheduleId == id)).GetValueOrDefault();
    }
}
