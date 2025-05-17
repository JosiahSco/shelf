namespace Shelf.Api.Models;

public class Media
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;

    public MediaType Type { get; set; }
}

public enum MediaType
{
    Movie,
    Show,
    Book,
    Game,
    Music
}