using Cinema.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Cinema.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly JwtBearerOptions _jwtBearerOptions;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AccountController(UserManager<User> userManager,
        SignInManager<User> signInManager,
        RoleManager<IdentityRole> roleManager,
        IOptionsMonitor<JwtBearerOptions> jwtBearerOptions,
        IPasswordHasher<User> passwordHasher)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _jwtBearerOptions = jwtBearerOptions.Get(JwtBearerDefaults.AuthenticationScheme);
        _passwordHasher = passwordHasher;
    }

    // POST: api/Account/Register
    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new User {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                Role = model.Role
            };
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

                // Get configuration
                string issuer = _jwtBearerOptions.TokenValidationParameters.ValidIssuer;
                string audience = _jwtBearerOptions.TokenValidationParameters.ValidAudience;
                var key = _jwtBearerOptions.TokenValidationParameters.IssuerSigningKey;
                //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key-here"));

                // Create a signing credentials using the security key
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                // Create a JWT token with username, role, issuer, audience and expiry date
                var token = new JwtSecurityToken(
                    issuer,
                    audience,
                    claims: new List<Claim>
                    {
                        new Claim("id", user.Id),
                        new Claim("role", string.Join(",", roles)),
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(ClaimTypes.Email, user.Email),
                        // Add more claims here if needed
                        // Add roles as claims
                        new Claim(ClaimTypes.Role, string.Join(",", roles))
                    },
                    expires: DateTime.Now.AddDays(3),
                    signingCredentials: creds
                );

                // Return the token to the client
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }

            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
        }

        return BadRequest(ModelState);
    }

    // Định nghĩa phương thức đổi mật khẩu
    [HttpPost("ChangePassword")]
    public async Task<IActionResult> ChangePassword([FromQuery] string userId, [FromQuery] string old, [FromQuery] string password)
    {
        // Tìm người dùng theo id
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound("User không tồn tại!");
        }

        // Kiểm tra mật khẩu cũ có đúng không
        var result = await _userManager.CheckPasswordAsync(user, old);
        if (!result && !old.IsNullOrEmpty())
        {
            return BadRequest("Mật khẩu cũ không đúng!");
        }

        // Đổi mật khẩu mới và cập nhật người dùng
        user.PasswordHash = _passwordHasher.HashPassword(user, password);
        var updateResult = await _userManager.UpdateAsync(user);
        return updateResult.Succeeded ? Ok() : BadRequest();
    }

    // POST: api/Account/Logout
    [HttpPost("Logout")]
    public IActionResult Logout()
    {
        // Do nothing as JWT is not stored in server. Just ask client to delete token.
        return Ok();
    }
}
