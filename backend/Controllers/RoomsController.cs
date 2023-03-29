using Microsoft.AspNetCore.Mvc;
using Cinema.Entities;
using Cinema.Services;
using Cinema.Exceptions;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoomsController : ControllerBase
{
    private readonly IRoomSystem _roomSystem;

    public RoomsController(IRoomSystem roomSystem)
    {
        _roomSystem = roomSystem;
    }

    // GET: api/Rooms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetRoom()
    {
        return Ok(await _roomSystem.GetRooms());
    }

    // GET: api/Rooms/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetRoom([FromRoute] string id)
    {
        var room = await _roomSystem.GetRoom(id);

        if (room == null)        
            return NotFound();

        return Ok(room);
    }

    // PUT: api/Rooms/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Room>> PutRoom([FromRoute] string id, [FromBody] Room room)
    {
        if (id != room.RoomId)
        {
            return BadRequest();
        }

        try
        {
            await _roomSystem.UpdateRoom(room);
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }

        return Ok(await _roomSystem.GetRoom(id));
    }

    // POST: api/Rooms
    [HttpPost]
    public async Task<ActionResult<Room>> PostRoom([FromBody] Room room)
    {
        var roomId = await _roomSystem.CreateRoom(room);

        return Ok(await _roomSystem.GetRoom(roomId));
    }
}
