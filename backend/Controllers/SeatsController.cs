using Cinema.Entities;
using Cinema.Exceptions;
using Cinema.Services;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeatsController : ControllerBase
{
    private readonly IRoomSystem _roomSystem;
    private readonly ISeatSystem _seatSystem;

    public SeatsController(IRoomSystem roomSystem, ISeatSystem seatSystem)
    {
        _roomSystem = roomSystem;
        _seatSystem = seatSystem;
    }

    // POST api/Seats
    [HttpPost]
    public async Task<ActionResult<Room>> Post([FromQuery] string roomId, [FromBody] Seat seat)
    {
        if (roomId != seat.RoomId)
            return BadRequest();
        try
        {
            await _seatSystem.CreateSeat(seat);
            return Ok(await _roomSystem.GetRoom(roomId));
        } catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
    }

    // PUT api/Seats/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Room>> Put([FromRoute] string id, [FromBody] Seat seat)
    {
        if (id != seat.SeatId)
            return BadRequest();
        try
        {
            await _seatSystem.UpdateSeat(seat);
            return Ok(await _roomSystem.GetRoom(seat.RoomId));
        } catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
        catch (InvalidDataException e)
        {
            return BadRequest(e.Message);
        }
    }

    // DELETE api/Seats/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Room>> Delete([FromRoute] string id)
    {
        try
        {
            var seat = await _seatSystem.DeleteSeat(id);
            return Ok(await _roomSystem.GetRoom(seat.RoomId));
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
    }
}
