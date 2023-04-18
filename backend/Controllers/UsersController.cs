using Cinema.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public UsersController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    // GET: api/Users
    [HttpGet]
    public IEnumerable<User> Get()
    {
        return _userManager.Users.ToList();
    }

    // GET api/Users/5
    [HttpGet("{id}")]
    public ActionResult<User> Get([FromRoute] string id)
    {
        var user = _userManager.Users.Where(u => u.Id == id).FirstOrDefault();
        return user == null ? NotFound() : Ok(user);
    }

    // PUT api/Users/5
    [HttpPut("{id}")]
    public async Task<ActionResult> Put([FromRoute] string id, [FromBody] User user)
    {
        if (id != user.Id) return BadRequest();
        var u = await _userManager.FindByIdAsync(id);
        if (u == null) return NotFound();
        u.Name = user.Name;
        u.PhoneNumber = user.PhoneNumber;
        u.Address = user.Address;
        var result = await _userManager.UpdateAsync(u);
        return result.Succeeded ? NoContent() : BadRequest();
    }

    // DELETE api/Users/5
    [HttpDelete("{id}")]
    public ActionResult Delete([FromRoute] string id)
    {
        var user = _userManager.Users.Where(u => u.Id == id).FirstOrDefault();
        if (user != null)
        {
            _userManager.DeleteAsync(user);
            return NoContent();
        }
        return BadRequest();
    }
}
