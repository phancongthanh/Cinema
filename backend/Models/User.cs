using Microsoft.AspNetCore.Identity;

namespace Cinema.Models;

public class User : IdentityUser
{
    public string Name { get; set; }

    public string Role { get; set; }
}