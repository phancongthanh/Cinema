using Cinema.Entities;
using Cinema.Models;
using Cinema.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Data;

public class DbContextInitialiser
{
    private readonly ILogger<DbContextInitialiser> _logger;
    private readonly CinemaContext _context;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IFilmSystem _filmSystem;
    private readonly IRoomSystem _roomSystem;
    private readonly IScheduleSystem _scheduleSystem;
    private readonly IBookingSystem _bookingSystem;

    public DbContextInitialiser(ILogger<DbContextInitialiser> logger,
        CinemaContext context,
        UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager,
        IFilmSystem filmSystem,
        IRoomSystem roomSystem,
        IScheduleSystem scheduleSystem,
        IBookingSystem bookingSystem)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
        _filmSystem = filmSystem;
        _roomSystem = roomSystem;
        _scheduleSystem = scheduleSystem;
        _bookingSystem = bookingSystem;
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
        var users = new[] {
            new User() {
                UserName = "admin@ncc.vn",
                Email = "admin@ncc.vn",
                Name = "Admin",
                Role = "Admin",
                PhoneNumber = "0123456789",
                Address = "144 Xuân Thủy, Cầu Giấy, Hà Nội"
            },
            new User()
            {
                UserName = "manager@ncc.vn",
                Email = "manager@ncc.vn",
                Name = "Quản lý rạp chiếu phim",
                Role = "Manager",
                PhoneNumber = "0123456789",
                Address = "144 Xuân Thủy, Cầu Giấy, Hà Nội"
            },
            new User()
            {
                UserName = "member@ncc.vn",
                Email = "member@ncc.vn",
                Name = "Nguyễn Văn A",
                Role = "Member",
                PhoneNumber = "0123456789",
                Address = "144 Xuân Thủy, Cầu Giấy, Hà Nội"
            }
        };
        foreach (var user in users)
        {
            // Check if role exists and create it if not
            if (!await _roleManager.RoleExistsAsync(user.Role))
            {
                await _roleManager.CreateAsync(new IdentityRole(user.Role));
            }
            if (!_userManager.Users.Any(u => u.UserName == user.UserName))
            {
                var result = await _userManager.CreateAsync(user, user.UserName);
                if (!result.Succeeded) _logger.LogError("Tạo tài khoản" + user.UserName + " lỗi!");
                // Assign role to user
                else await _userManager.AddToRoleAsync(user, user.Role);
            }
        }
        
        // Films
        if (!(await _filmSystem.GetFilms()).Any())
        {
            var films = new[]
            {
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "KHÓA CHẶT CỬA NÀO SUZUME",
                    Category = "Hoạt hình",
                    Time = 100,
                    Description = "\"Khóa Chặt Cửa Nào Suzume\" kể câu chuyện khi Suzume vô tình gặp một chàng trai trẻ đến thị trấn nơi cô sinh sống với mục đích tìm kiếm \"một cánh cửa\". Để bảo vệ Nhật Bản khỏi thảm họa, những cánh cửa rải rác khắp nơi phải được đóng lại, và bất ngờ thay Suzume cũng có khả năng đóng cửa đặc biệt này. Từ đó cả hai cùng nhau thực hiện sự mệnh \"khóa chặt cửa\"!",
                    Director = "Makoto Shinkai",
                    Actors = null,
                    Country = "Nhật",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016786_0.jpeg",
                    Trailer = "https://youtu.be/w9HWe8zt64M"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "ANH EM SUPER MARIO",
                    Category = "Hài, Hoạt hình",
                    Time = 84,
                    Description = "Câu chuyện về cuộc phiêu lưu của anh em Super Mario đến vương quốc Nấm.",
                    Director = "Aaron Horvath, Michael Jelenic",
                    Actors = "Chris Pratt, Anya Taylor-Joy, Charlie Day,…",
                    Country = "Mỹ",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016784_0.jpeg",
                    Trailer = "https://youtu.be/UGO_i2tf1BM"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "CHUỘT NHÍ VÀ SỨ MỆNH THẦN BIỂN",
                    Category = "Hài, Hoạt hình",
                    Time = 90,
                    Description = "Bé Tí – một chú chuột nhỏ thông minh luôn mang trong mình một ước mơ to lớn là được trở thành một vị anh hùng thám hiểm như Anh Hùng Biển vĩ đại. Nhưng với Bố Bự - chú mèo đã nhận nuôi cô thì đây là điều hão huyền.",
                    Director = "David Alaux",
                    Actors = "Valentino Bisegna, Sara Di Sturco, Chiara Fabiano and Mattia Fabiano",
                    Country = "Mỹ",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016781_0.jpeg",
                    Trailer = "https://youtu.be/9dldS-QoUIk"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "CUỘC CHIẾN BẤT TỬ",
                    Category = "Hài, Hoạt hình",
                    Time = 79,
                    Description = "How To Save The Immortal là bộ phim về nhân vật phản diện nổi tiếng nhất trong truyện cổ tích Nga. Bộ phim được đạo diện bởi Roman Artemiev và sự tham gia sản xuất của Vadim Sotskov, Sergei Selyanov, and Sergei Zernov. Xoay quanh cuộc đời của nhân vật Drybone sở hữu sức mạnh bất tử, dù luôn trẻ trung và bảnh bao nhưng vẫn không thể tìm được cô dâu cho mình trong suốt 300 năm. Mặc cho anh ta đe dọa, bắt cóc hay thậm chí biến nhiều công chúa thành ếch thì kế hoạch tán tỉnh của Hoàng Tử Bóng Đêm cùng không thuộn buồm xuôi gió hơn. Trong khi đó thì tất cả những gì mà nữ chiến binh xinh đẹp và dũng cảm Barbara làm là chống lại những kẻ sắp theo đuổi cô trên đấu trường hay những kẻ cầu hôn chỉ vì thèm muốn của hồi môn của Barbara. Sự đối lập này vô tình đưa Drybone và Barbara vào cuộc gặp gỡ định mệnh và cùng chiến đấu với phe phản diện mới là Vua Lentil – kẻ nắm giữ cây kim có thể tước đoạt mạng sống của Hoàng Tử Bóng Đêm Drybone. Dù vậy, hắn không thể ngờ vẫn còn điều kỳ diệu ẩn chứa bên trong trái tim của Drybone giúp anh ấy sống sót...",
                    Director = "Roman Artemiev",
                    Actors = "iktor Dobronravov, Ekaterina Tarasova, Vladimir Sychov, Elizaveta Boyarskaya, Roman Artemiev, Irina Savina, Elena Shulman, Anton Eldarov",
                    Country = "Mỹ",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016816_0.jpeg",
                    Trailer = "https://youtu.be/eyq8cwWhMjk"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "NGƯỜI NHỆN: DU HÀNH VŨ TRỤ NHỆN",
                    Category = "Hành động, Khoa học viễn tưởng",
                    Time = 100,
                    Description = "Vô số Spider-Man từ khắp các vũ trụ đang đối đầu nhau?! Xem ngay Official Trailer của SPIDER-MAN: ACROSS THE SPIDER-VERSE",
                    Director = "Joaquim Dos Santos, Justin K. Thompson, Kemp Powers",
                    Actors = "Shameik Moore",
                    Country = "Mỹ",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016798_0.jpeg",
                    Trailer = "https://youtu.be/SUz8Aw28vrc"
                },
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "SIÊU LỪA GẶP SIÊU LẦY- C16",
                    Category = "Hài",
                    Time = 112,
                    Description = "Thuộc phong cách hành động – hài hước với các “cú lừa” thông minh và lầy lội đến từ bộ đôi Tú (Anh Tú) và Khoa (Mạc Văn Khoa), Siêu Lừa Gặp Siêu Lầy của đạo diễn Võ Thanh Hòa theo chân của Khoa – tên lừa đảo tầm cỡ “quốc nội” đến đảo ngọc Phú Quốc với mong muốn đổi đời. Tại đây, Khoa gặp Tú – tay lừa đảo “hàng real” và cùng Tú thực hiện các phi vụ từ nhỏ đến lớn. Cứ ngỡ sự ranh mãnh của Tú và sự may mắn trời cho của Khoa sẽ giúp họ trở thành bộ đôi bất khả chiến bại, nào ngờ lại đối mặt với nhiều tình huống dở khóc – dở cười. Nhất là khi băng nhóm của bộ đôi nhanh chóng mở rộng vì sự góp mặt của ông Năm (Nhất Trung) và bé Mã Lai (Ngọc Phước).",
                    Director = "Võ Thanh Hòa",
                    Actors = "Anh Tú, Mạc Văn Khoa, Ngọc Phước, Nhất Trung,...",
                    Country = "Việt Nam",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016720_0.jpeg",
                    Trailer = "https://youtu.be/s8l6VZQH9iM"
                }
                ,
                new Film()
                {
                    FilmId = Guid.NewGuid().ToString(),
                    Title = "KHẮC TINH CỦA QUỶ- C18",
                    Category = "Kinh dị",
                    Time = 104,
                    Description = "Lấy cảm hứng từ những hồ sơ có thật của Cha Gabriele Amorth, Trưởng Trừ Tà của Vatican (Russell Crowe, đoạt giải Oscar®), bộ phim \"The Pope's Exorcist\" theo chân Amorth trong cuộc điều tra về vụ quỷ ám kinh hoàng của một cậu bé và dần khám phá ra những bí mật hàng thế kỷ mà Vatican đã cố gắng giấu kín.",
                    Director = "Julius Avery",
                    Actors = "Russell Crowe, Franco Nero,...",
                    Country = "Mỹ",
                    Poster = "https://chieuphimquocgia.com.vn/Content/Images/0016805_0.jpeg",
                    Trailer = "https://youtu.be/p4LAYNacgkI"
                }
            };
            foreach (var film in films) await _filmSystem.CreateFilm(film);
        }
        // Rooms
        if (!(await _roomSystem.GetRooms()).Any())
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
                await _roomSystem.CreateRoom(room);
            }
        }
        // Schedules
        if (!(await _scheduleSystem.GetSchedules()).Any())
        {
            var schedules = new List<Schedule>();
            var films = await _context.Films.ToListAsync();
            var rooms = await _context.Rooms.Include(r => r.Seats).ToListAsync();

            var time = DateTime.Now.AddDays(-1);
            time = time.AddSeconds(60 - time.Second);
            time = time.AddMinutes(60 - time.Minute);
            var random = new Random(0);
            schedules.Add(new Schedule()
            {
                ScheduleId = Guid.NewGuid().ToString(),
                RoomId = rooms[random.Next(rooms.Count)].RoomId,
                FilmId = films[0].FilmId,
                StartTime = time.AddMonths(-1),
                EndTime = time.AddMonths(-1).AddMinutes(films[0].Time / 30 * 30 + 30)
            });
            while (time < DateTime.Now.AddDays(7))
            {
                var room = rooms[random.Next(rooms.Count)];
                var film = films[random.Next(time > DateTime.Now.AddDays(4) ? films.Count : films.Count-2)];
                if (time.Hour < 7) time = time.AddHours(7 - time.Hour);
                else if (time.Hour >= 12 && time.Hour < 14) time = time.AddHours(14 - time.Hour);
                else if (time.Hour >= 18) time = time.AddHours(24 - time.Hour + 7);
                var schedule = new Schedule()
                {
                    ScheduleId = Guid.NewGuid().ToString(),
                    RoomId = room.RoomId,
                    FilmId = film.FilmId,
                    StartTime = time,
                    EndTime = time.AddMinutes(film.Time / 30 * 30 + 30)
                };
                time = schedule.EndTime;
                schedules.Add(schedule);
            }

            foreach (var schedule in schedules)
                await _scheduleSystem.CreateSchedule(schedule, 50000, 60000);
        }
        // Booking
        if (!_context.Bookings.Any())
        {
            var schedules = await _scheduleSystem.GetSchedules();
            var members = await _userManager.Users.Where(u => u.Role == "Member").ToListAsync();
            var random = new Random(0);
            foreach (var schedule in schedules)
            {
                var tickets = (await _scheduleSystem.GetSchedule(schedule.ScheduleId))?.Tickets ?? Array.Empty<Ticket>();
                tickets = tickets.Where(t => t.Status == TicketStatus.Available);
                foreach (var ticket in tickets)
                {
                    if (random.Next(1000) >= 100) continue;
                    var member = members[random.Next(members.Count)];
                    await _bookingSystem.Book(member.Id, ticket.TicketId);
                    await _bookingSystem.Pay(member.Id, ticket.TicketId);
                    if (random.Next(1000) < 100)
                        await _bookingSystem.Cancel(member.Id, ticket.TicketId);
                }
            }
        }
    }
}
