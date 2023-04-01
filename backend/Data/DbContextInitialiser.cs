using Microsoft.EntityFrameworkCore;

namespace Cinema.Data;

public class DbContextInitialiser
{
    private readonly ILogger<DbContextInitialiser> _logger;
    private readonly CinemaContext _context;

    public DbContextInitialiser(ILogger<DbContextInitialiser> logger, CinemaContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            if (_context.Database.IsMySql())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public Task TrySeedAsync()
    {
        /*
        // Default users
        var administrator = new ApplicationUser {
            UserName = "+84987654321"};
        var command = new CreateAccountCommand(
            new AccountModel() { Country = 84, Phone = "+84987654321", Password = "Admin@123"},
            "Web Chat",
            DateTime.Now.AddYears(18),
            Domain.Enums.GenderType.Male
            );
        var result = await _mediator.Send(command);
        
        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "Administrator!");
        }
        */
        return Task.CompletedTask;
    }
}
