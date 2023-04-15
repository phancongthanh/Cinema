using Cinema.Entities;
using Cinema.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Data;

public class DbContextInitialiser
{
    private readonly ILogger<DbContextInitialiser> _logger;
    private readonly CinemaContext _context;
    private readonly UserManager<User> _userManager;

    public DbContextInitialiser(ILogger<DbContextInitialiser> logger, CinemaContext context, UserManager<User> userManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
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

    public async Task TrySeedAsync()
    {
        // Default users
        var administrator = new User
        {
            UserName = "admin@admin.com",
            Email = "admin@admin.com",
            Name = "Admin",
            Role = "Admin"
        };
        if (!_userManager.Users.Any(u => u.UserName == administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "admin");
        }
        // Films
        if (!_context.Films.Any())
        {
            var films = new[]
            {
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "KHÓA CHẶT CỬA NÀO SUZUME (PHỤ ĐỀ VIỆT, ANH) - P",
                    Category = "Hoạt hình",
                    Time = 100,
                    Description = "\"Khóa Chặt Cửa Nào Suzume\" kể câu chuyện khi Suzume vô tình gặp một chàng trai trẻ đến thị trấn nơi cô sinh sống với mục đích tìm kiếm \"một cánh cửa\". Để bảo vệ Nhật Bản khỏi thảm họa, những cánh cửa rải rác khắp nơi phải được đóng lại, và bất ngờ thay Suzume cũng có khả năng đóng cửa đặc biệt này. Từ đó cả hai cùng nhau thực hiện sự mệnh \"khóa chặt cửa\"!",
                    Director = "Makoto Shinkai",
                    Actors = null,
                    Country = "Nhật",
                    Tags = "",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016786_0.jpeg",
                    Trailer = "https://youtu.be/w9HWe8zt64M"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "ANH EM SUPER MARIO (HH lồng tiếng P)",
                    Category = "Hài, Hoạt hình",
                    Time = 84,
                    Description = "Câu chuyện về cuộc phiêu lưu của anh em Super Mario đến vương quốc Nấm.",
                    Director = "Aaron Horvath, Michael Jelenic",
                    Actors = "Chris Pratt, Anya Taylor-Joy, Charlie Day,…",
                    Country = "Mỹ",
                    Tags = "",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016784_0.jpeg",
                    Trailer = "https://youtu.be/UGO_i2tf1BM"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "CHUỘT NHÍ VÀ SỨ MỆNH THẦN BIỂN (lồng tiếng)-P",
                    Category = "Hài, Hoạt hình",
                    Time = 90,
                    Description = "Bé Tí – một chú chuột nhỏ thông minh luôn mang trong mình một ước mơ to lớn là được trở thành một vị anh hùng thám hiểm như Anh Hùng Biển vĩ đại. Nhưng với Bố Bự - chú mèo đã nhận nuôi cô thì đây là điều hão huyền.",
                    Director = "David Alaux",
                    Actors = "Valentino Bisegna, Sara Di Sturco, Chiara Fabiano and Mattia Fabiano",
                    Country = "Mỹ",
                    Tags = "",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016781_0.jpeg",
                    Trailer = "https://youtu.be/9dldS-QoUIk"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "CUỘC CHIẾN BẤT TỬ (HH lồng tiếng P)",
                    Category = "Hài, Hoạt hình",
                    Time = 79,
                    Description = "How To Save The Immortal là bộ phim về nhân vật phản diện nổi tiếng nhất trong truyện cổ tích Nga. Bộ phim được đạo diện bởi Roman Artemiev và sự tham gia sản xuất của Vadim Sotskov, Sergei Selyanov, and Sergei Zernov. Xoay quanh cuộc đời của nhân vật Drybone sở hữu sức mạnh bất tử, dù luôn trẻ trung và bảnh bao nhưng vẫn không thể tìm được cô dâu cho mình trong suốt 300 năm. Mặc cho anh ta đe dọa, bắt cóc hay thậm chí biến nhiều công chúa thành ếch thì kế hoạch tán tỉnh của Hoàng Tử Bóng Đêm cùng không thuộn buồm xuôi gió hơn. Trong khi đó thì tất cả những gì mà nữ chiến binh xinh đẹp và dũng cảm Barbara làm là chống lại những kẻ sắp theo đuổi cô trên đấu trường hay những kẻ cầu hôn chỉ vì thèm muốn của hồi môn của Barbara. Sự đối lập này vô tình đưa Drybone và Barbara vào cuộc gặp gỡ định mệnh và cùng chiến đấu với phe phản diện mới là Vua Lentil – kẻ nắm giữ cây kim có thể tước đoạt mạng sống của Hoàng Tử Bóng Đêm Drybone. Dù vậy, hắn không thể ngờ vẫn còn điều kỳ diệu ẩn chứa bên trong trái tim của Drybone giúp anh ấy sống sót...",
                    Director = "Roman Artemiev",
                    Actors = "iktor Dobronravov, Ekaterina Tarasova, Vladimir Sychov, Elizaveta Boyarskaya, Roman Artemiev, Irina Savina, Elena Shulman, Anton Eldarov",
                    Country = "Mỹ",
                    Tags = "",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016816_0.jpeg",
                    Trailer = "https://youtu.be/eyq8cwWhMjk"
                }
            };
            await _context.Films.AddRangeAsync(films);
            await _context.SaveChangesAsync();
        }
        // Rooms
        if (!_context.Rooms.Any())
        {
            for (int i = 0; i < 5; i++)
            {
                var room = new Room()
                {
                    RoomId = Guid.NewGuid().ToString(),
                    Name = "Phòng " + (i + 1),
                    Address = "Tầng " + (i / 2 + 1) + " - Phòng " + (i + 1)
                };
                for (int row = 1; row <= 10; row++)
                {
                    for (int col = 1; col <= 15; col++)
                    {
                        var seat = new Seat()
                        {
                            SeatId = Guid.NewGuid().ToString(),
                            RoomId = room.RoomId,
                            Position = "Hàng " + row + " - Cột " + col,
                            Row = row,
                            Column = col,
                            IsAvailable = true,
                            IsVip = row >= 4 && row <= 9 && col >= 3 && col <= 13
                        };
                        room.Seats.Add(seat);
                    }
                }
                await _context.Rooms.AddAsync(room);
            }
            await _context.SaveChangesAsync();
        }
        // Schedules
        if (!_context.Schedules.Any())
        {
            var schedules = new List<Schedule>();
            var films = await _context.Films.ToListAsync();
            var rooms = await _context.Rooms.Include(r => r.Seats).ToListAsync();
            for (int i=0;i<rooms.Count;i++)
            {
                var room = rooms[i];
                var time = DateTime.Now.AddDays(-1);
                time.AddMinutes(60 - time.Minute);
                var random = new Random(0);
                while (time < DateTime.Now.AddDays(14))
                {
                    var film = films[random.Next(films.Count)];
                    if (time.Hour < 7) time = time.AddHours(7 - time.Hour);
                    else if (time.Hour >= 11 && time.Hour < 14) time = time.AddHours(14 - time.Hour);
                    else if (time.Hour >= 17) time = time.AddHours(24 - time.Hour + 7);
                    var schedule = new Schedule()
                    {
                        ScheduleId = Guid.NewGuid().ToString(),
                        RoomId = room.RoomId,
                        FilmId = film.FilmId,
                        StartTime = time,
                        EndTime = time.AddMinutes(films[0].Time / 30 * 30 + 30)
                    };
                    time = schedule.EndTime;
                    if (random.Next(1000) < 200) schedules.Add(schedule);
                }
            }
            _context.Schedules.AddRange(schedules);
            foreach (var schedule in schedules)
            {
                
                var room = rooms.Single(r => r.RoomId == schedule.RoomId);
                var tickets = room.Seats.Select(seat => new Ticket()
                {
                    SeatId = seat.SeatId,
                    ScheduleId = schedule.ScheduleId,
                    Cost = seat.IsVip ? 75000 : 50000,
                    UserId = null,
                    Status = TicketStatus.Available
                });
                _context.Tickets.AddRange(tickets);
            }
            await _context.SaveChangesAsync();
        }
    }
}
