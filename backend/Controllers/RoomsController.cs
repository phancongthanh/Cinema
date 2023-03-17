﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinema.Data;
using Cinema.Entities;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoomsController : ControllerBase
{
    private readonly CinemaContext _context;

    public RoomsController(CinemaContext context)
    {
        _context = context;
    }

    // GET: api/Rooms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetRoom()
    {
      if (_context.Rooms == null)
      {
          return NotFound();
      }
        return await _context.Rooms.ToListAsync();
    }

    // GET: api/Rooms/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetRoom(string id)
    {
      if (_context.Rooms == null)
      {
          return NotFound();
      }
        var room = await _context.Rooms.FindAsync(id);

        if (room == null)
        {
            return NotFound();
        }

        return room;
    }

    // PUT: api/Rooms/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRoom(string id, Room room)
    {
        if (id != room.RoomId)
        {
            return BadRequest();
        }

        _context.Entry(room).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RoomExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Rooms
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Room>> PostRoom(Room room)
    {
      if (_context.Rooms == null)
      {
          return Problem("Entity set 'CinemaContext.Room'  is null.");
      }
        _context.Rooms.Add(room);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (RoomExists(room.RoomId))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetRoom", new { id = room.RoomId }, room);
    }

    // DELETE: api/Rooms/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(string id)
    {
        if (_context.Rooms == null)
        {
            return NotFound();
        }
        var room = await _context.Rooms.FindAsync(id);
        if (room == null)
        {
            return NotFound();
        }

        _context.Rooms.Remove(room);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool RoomExists(string id)
    {
        return (_context.Rooms?.Any(e => e.RoomId == id)).GetValueOrDefault();
    }
}
