using Cinema.Entities;

namespace Cinema.Models;

public class FilmDetail : Film
{
    public IEnumerable<Schedule> Schedules { get; set; }

    public FilmDetail(Film film)
    {
        FilmId = film.FilmId;
        Title = film.Title;
        Category = film.Category;
        Description = film.Description;
        Director = film.Director;
        Actors = film.Actors;
        Time = film.Time;
        Country = film.Country;
        Poster = film.Poster;
        Trailer = film.Trailer;
        Schedules = new List<Schedule>();
    }

    public FilmDetail(Film film, IEnumerable<Schedule> schedules)
    {
        FilmId = film.FilmId;
        Title = film.Title;
        Category = film.Category;
        Description = film.Description;
        Director = film.Director;
        Actors = film.Actors;
        Time = film.Time;
        Country = film.Country;
        Poster = film.Poster;
        Trailer = film.Trailer;
        Schedules = schedules;
    }
}
