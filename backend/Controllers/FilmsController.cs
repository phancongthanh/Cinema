using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinema.Data;
using Cinema.Entities;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FilmsController : ControllerBase
{
    private readonly CinemaContext _context;

    public FilmsController(CinemaContext context)
    {
        _context = context;
    }

    // GET: api/Films
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Film>>> GetFilm()
    {
      if (_context.Films == null)
      {
          return NotFound();
      }
        return await _context.Films.ToListAsync();
    }

    // GET: api/Films/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Film>> GetFilm(string id)
    {
      if (_context.Films == null)
      {
          return NotFound();
      }
        var film = await _context.Films.FindAsync(id);

        if (film == null)
        {
            return NotFound();
        }

        return film;
    }

    // PUT: api/Films/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFilm(string id, Film film)
    {
        if (id != film.FilmId)
        {
            return BadRequest();
        }

        _context.Entry(film).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FilmExists(id))
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

    // POST: api/Films
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Film>> PostFilm(Film film)
    {
      if (_context.Films == null)
      {
          return Problem("Entity set 'CinemaContext.Film'  is null.");
      }
        _context.Films.Add(film);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (FilmExists(film.FilmId))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetFilm", new { id = film.FilmId }, film);
    }

    // DELETE: api/Films/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFilm(string id)
    {
        if (_context.Films == null)
        {
            return NotFound();
        }
        var film = await _context.Films.FindAsync(id);
        if (film == null)
        {
            return NotFound();
        }

        _context.Films.Remove(film);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FilmExists(string id)
    {
        return (_context.Films?.Any(e => e.FilmId == id)).GetValueOrDefault();
    }
}
