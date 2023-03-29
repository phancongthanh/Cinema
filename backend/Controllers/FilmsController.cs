using Microsoft.AspNetCore.Mvc;
using Cinema.Entities;
using Cinema.Services;
using Cinema.Exceptions;
using Cinema.Models;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FilmsController : ControllerBase
{
    private readonly IFilmSystem _filmSystem;

    public FilmsController(IFilmSystem filmSystem)
    {
        _filmSystem = filmSystem;
    }

    // GET: api/Films
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FilmDetail>>> GetFilm()
    {
        return Ok(await _filmSystem.GetFilms());
    }

    // GET: api/Films/5
    [HttpGet("{id}")]
    public async Task<ActionResult<FilmDetail>> GetFilm([FromRoute] string id)
    {
        var film = await _filmSystem.GetFilmDetail(id);
        return film == null ? NotFound() : Ok(film);
    }

    // PUT: api/Films/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Film>> PutFilm([FromRoute] string id, [FromBody] Film film)
    {
        if (id != film.FilmId)
        {
            return BadRequest();
        }
        try
        {
            await _filmSystem.UpdateFilm(film);
            return Ok(await _filmSystem.GetFilm(id));
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: api/Films
    [HttpPost]
    public async Task<ActionResult<Film>> PostFilm([FromBody] Film film)
    {
        film.FilmId = string.Empty;
        var filmId = await _filmSystem.CreateFilm(film);
        return Ok(await _filmSystem.GetFilm(filmId));
    }
}
