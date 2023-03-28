namespace Cinema.Entities;

public class FileEntity
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string ContentType { get; set; }
    public byte[] Data { get; set; }
}
