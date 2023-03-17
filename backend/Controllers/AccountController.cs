using Cinema.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AccountController(UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
    }

    // POST: api/Account/Register
    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Check if role exists and create it if not
                if (!await _roleManager.RoleExistsAsync(model.Role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(model.Role));
                }

                // Assign role to user
                await _userManager.AddToRoleAsync(user, model.Role);

                // Return a success message to the client
                return Ok("User registered successfully.");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        return BadRequest(ModelState);
    }

    // POST: api/Account/Login
    [HttpPost("Login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email,
                model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                // Get user roles
                var roles = await _userManager.GetRolesAsync(user);

                // Create a symmetric security key
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key-here"));

                // Create a signing credentials using the security key
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                // Create a JWT token with username, role, issuer, audience and expiry date
                var token = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(ClaimTypes.Email, user.Email),
                        // Add more claims here if needed
                        // Add roles as claims
                        new Claim(ClaimTypes.Role, string.Join(",", roles))
                    },
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                // Return the token to the client
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }

            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
        }

        return BadRequest(ModelState);
    }

    // POST: api/Account/Logout
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        // Do nothing as JWT is not stored in server. Just ask client to delete token.
        return Ok();
    }
}
