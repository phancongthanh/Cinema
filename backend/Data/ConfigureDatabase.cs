using Cinema.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Cinema.Models;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureDatabase
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("CinemaContext")
            ?? throw new InvalidOperationException("Connection string 'CinemaContext' not found.");

        services.AddDbContext<CinemaContext>(options =>
            options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 31)),
                builder => builder.MigrationsAssembly(typeof(CinemaContext).Assembly.FullName)));

        services.AddIdentity<User, IdentityRole>(options =>
        {
            // Configure password policy here
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 5;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
            options.Password.RequiredUniqueChars = 0;

            // Configure lockout policy here
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;
        })
        .AddEntityFrameworkStores<CinemaContext>();

        services.AddScoped<DbContextInitialiser>();

        return services;
    }
}
