namespace Cinema.Entities;

public class Film
{
    public string FilmId { get; set; }

    public string Title { get; set; }
    
    public string Category { get; set;} = string.Empty;

    public int Time { get; set; }

    public string Description { get; set; } = string.Empty;

    public string? Director { get; set; }
    
    public string? Actors { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string? Poster { get; set; }

    public string? Trailer { get; set; }
}
