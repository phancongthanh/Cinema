using Cinema.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.

var services = builder.Services;

services.AddDatabase(builder.Configuration);

services.AddScoped<IFilmSystem, FilmSystem>();
services.AddScoped<IRoomSystem, RoomSystem>();
services.AddScoped<ISeatSystem, SeatSystem>();
services.AddScoped<IScheduleSystem, ScheduleSystem>();
services.AddScoped<IBookingSystem, BookingSystem>();

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        configuration.Bind("JwtSettings", options);
        var key = Encoding.UTF8.GetBytes(configuration["JwtSettings:SecurityKey"]
            ?? throw new ArgumentNullException("JwtSettings:SecurityKey"));
        options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(key);
    });

services.AddCors();

services.AddControllers();


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseStaticFiles();

app.UseCors(
    options => options.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();