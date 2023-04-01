using Cinema.Entities;

namespace Cinema.Models;

public class FilmDetail : Film
{
    public IEnumerable<Schedule> Schedules { get; set; }

    public FilmDetail(Film film)
    {
        FilmId = film.FilmId;
        Title = film.FilmId;
        Category = film.Category;
        Description = film.Description;
        Director = film.Director;
        Actors = film.Actors;
        Language = film.Language;
        Poster = film.Poster;
        Trailer = film.Trailer;
        Tags = film.Tags;
        Schedules = new List<Schedule>();
    }

    public FilmDetail(Film film, IEnumerable<Schedule> schedules)
    {
        FilmId = film.FilmId;
        Title = film.FilmId;
        Category = film.Category;
        Description = film.Description;
        Director = film.Director;
        Actors = film.Actors;
        Language = film.Language;
        Poster = film.Poster;
        Trailer = film.Trailer;
        Tags = film.Tags;
        Schedules = schedules;
    }
}
