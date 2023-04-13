using Cinema.Data;
using Cinema.Entities;
using Cinema.Exceptions;
using Cinema.Models;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services;

public interface IFilmSystem
{
    Task<IEnumerable<FilmDetail>> GetFilms();

    Task<Film?> GetFilm(string filmId);

    Task<FilmDetail?> GetFilmDetail(string filmId);

    Task<string> CreateFilm(Film film);

    Task UpdateFilm(Film film);
}

public class FilmSystem : IFilmSystem
{
    private readonly CinemaContext _context;

    public FilmSystem(CinemaContext context)
    {
        _context = context;
    }

    public async Task<string> CreateFilm(Film film)
    {
        film.FilmId = Guid.NewGuid().ToString();
        await _context.Films.AddAsync(film);
        await _context.SaveChangesAsync();
        return film.FilmId;
    }

    public async Task<Film?> GetFilm(string filmId)
    {
        return await _context.Films.AsNoTracking()
            .Where(f => f.FilmId == filmId)
            .FirstOrDefaultAsync();
    }

    public async Task<FilmDetail?> GetFilmDetail(string filmId)
    {
        var film = await _context.Films.AsNoTracking()
            .Where(f => f.FilmId == filmId)
            .FirstOrDefaultAsync();
        if (film == null) return null;
        var schedules = await _context.Schedules.AsNoTracking()
            .Where(s => s.FilmId == filmId)
            .OrderBy(s => s.StartTime)
            .ToListAsync();
        return new FilmDetail(film, schedules);
    }

    public async Task<IEnumerable<FilmDetail>> GetFilms()
    {
        var films = await _context.Films.AsNoTracking().ToListAsync();
        var schedules = await _context.Schedules.AsNoTracking().ToListAsync();
        return films.Select(f => new FilmDetail(f, schedules.Where(s => s.FilmId == f.FilmId).OrderBy(s => s.StartTime)));
    }

    public async Task UpdateFilm(Film film)
    {
        _context.Entry(film).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (FilmExists(film.FilmId))
            {
                throw new NotFoundException("Phim không tồn tại!");
            }
            else
            {
                throw;
            }
        }
    }

    private bool FilmExists(string id)
    {
        return (_context.Films?.Any(e => e.FilmId == id)).GetValueOrDefault();
    }
}
