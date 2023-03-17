using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;

services.AddDatabase(builder.Configuration);

services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();

services.AddCors();

services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseStaticFiles();

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();