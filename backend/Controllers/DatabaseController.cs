using Cinema.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {
        private readonly DbContextInitialiser _dbContextInitialiser;
        private readonly CinemaContext _context;

        public DatabaseController(DbContextInitialiser dbContextInitialiser, CinemaContext context)
        {
            _dbContextInitialiser = dbContextInitialiser;
            _context = context;
        }

        [HttpGet("initialise")]
        public async Task<IActionResult> InitialiseDatabase()
        {
            await _dbContextInitialiser.InitialiseAsync();
            return Ok("Đã tạo database!");
        }

        [HttpGet("script")]
        public IActionResult GetDatabaseScript()
        {
            var script = _context.Database.GenerateCreateScript();
            return Ok(script);
        }
    }
}
