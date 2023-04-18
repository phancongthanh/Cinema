using Microsoft.AspNetCore.Mvc;
using Cinema.Entities;
using Cinema.Services;
using Cinema.Models;
using Cinema.Exceptions;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SchedulesController : ControllerBase
{
    private readonly IScheduleSystem _scheduleSystem;

    public SchedulesController(IScheduleSystem scheduleSystem)
    {
        _scheduleSystem = scheduleSystem;
    }


    // GET: api/Schedules
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedule()
    {
        return Ok(await _scheduleSystem.GetSchedules());
    }

    // GET: api/Schedules/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ScheduleDetail>> GetSchedule([FromRoute] string id)
    {
        var schedule = await _scheduleSystem.GetSchedule(id);
        return schedule == null ? NotFound() : Ok(schedule);
    }

    // PUT: api/Schedules/5
    [HttpPut("{id}")]
    public async Task<ActionResult<ScheduleDetail>> PutSchedule([FromRoute] string id, [FromBody] Schedule schedule)
    {
        if (id != schedule.ScheduleId)
            return BadRequest();

        try
        {
            await _scheduleSystem.UpdateSchedule(id, schedule.StartTime, schedule.EndTime);
            return Ok(await _scheduleSystem.GetSchedule(id));
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: api/Schedules
    [HttpPost]
    public async Task<ActionResult<ScheduleDetail>> PostSchedule(
        [FromBody] Schedule schedule,
        [FromQuery] double baseCost,
        [FromQuery] double vipCost)
    {
        try
        {
            var scheduleId = await _scheduleSystem.CreateSchedule(schedule, baseCost, vipCost);
            return Ok(await _scheduleSystem.GetSchedule(scheduleId));
        }
        catch (NotFoundException e)
        {
            return BadRequest(e.Message);
        }
    }
}
