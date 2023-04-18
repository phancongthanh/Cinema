using Cinema.Data;
using Cinema.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FilesController : ControllerBase
{
    private readonly CinemaContext _context;

    public FilesController(CinemaContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<string>> Upload(IFormFile file)
    {
        // Tạo mảng bytes
        var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        
        // Lưu file vào database
        var newFile = new FileEntity
        {
            Id = Guid.NewGuid().ToString(),
            Name = file.FileName,
            ContentType = file.ContentType,
            Data = memoryStream.ToArray()
        };
        _context.Files.Add(newFile);
        await _context.SaveChangesAsync();

        return Ok(newFile.Id);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Download([FromRoute] string id)
    {
        // Lấy file từ database
        var file = await _context.Files.FindAsync(id);
        if (file == null) return NotFound();

        return File(file.Data, file.ContentType, file.Name);
    }
}