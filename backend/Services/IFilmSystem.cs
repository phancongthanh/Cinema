using Cinema.Data;
using Cinema.Entities;
using Cinema.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services;

public interface IFilmSystem
{
    Task<IEnumerable<Film>> GetFilms();

    Task<Film?> GetFilm(string filmId);

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

    public async Task<IEnumerable<Film>> GetFilms()
    {
        return await _context.Films.AsNoTracking().ToListAsync();
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
