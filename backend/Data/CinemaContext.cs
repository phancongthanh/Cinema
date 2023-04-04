using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Cinema.Entities;
using Cinema.Models;

namespace Cinema.Data
{
    public class CinemaContext : IdentityDbContext<User>
    {
        public CinemaContext (DbContextOptions<CinemaContext> options)
            : base(options)
        {
        }

        public DbSet<Room> Rooms => Set<Room>();

        public DbSet<Seat> Seats => Set<Seat>();

        public DbSet<Film> Films => Set<Film>();

        public DbSet<Schedule> Schedules => Set<Schedule>();

        public DbSet<Ticket> Tickets => Set<Ticket>();

        public DbSet<Booking> Bookings => Set<Booking>();

        public DbSet<FileEntity> Files => Set<FileEntity>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Room>().ToTable(nameof(Room)).HasKey(x => x.RoomId);
            builder.Entity<Seat>().ToTable(nameof(Seat)).HasKey(x => x.SeatId);
            builder.Entity<Room>().HasMany(x => x.Seats).WithOne().HasForeignKey(x => x.RoomId);

            builder.Entity<Film>().ToTable(nameof(Film)).HasKey(x => x.FilmId);

            builder.Entity<Schedule>().ToTable(nameof(Schedule)).HasKey(x => x.ScheduleId);
            builder.Entity<Ticket>().ToTable(nameof(Ticket)).HasKey(x => x.TicketId);
            builder.Entity<Ticket>().Property(t => t.TicketId).ValueGeneratedOnAdd();
            builder.Entity<Booking>().ToTable(nameof(Booking)).HasKey(x => x.BookingId);
            builder.Entity<Booking>().Property(t => t.BookingId).ValueGeneratedOnAdd();
            builder.Entity<Ticket>().HasMany<Booking>().WithOne().HasForeignKey(x => x.TicketId);
            builder.Entity<Schedule>().HasMany<Ticket>().WithOne().HasForeignKey(x => x.ScheduleId);
            builder.Entity<Schedule>().HasMany<Booking>().WithOne().HasForeignKey(x => x.ScheduleId);

            builder.Entity<Film>().HasMany<Schedule>().WithOne().HasForeignKey(x => x.FilmId);
            builder.Entity<Room>().HasMany<Schedule>().WithOne().HasForeignKey(x => x.RoomId);
            builder.Entity<Seat>().HasMany<Ticket>().WithOne().HasForeignKey(x => x.SeatId);

            builder.Entity<User>().HasMany<Ticket>().WithOne().HasForeignKey(x => x.UserId);
            builder.Entity<User>().HasMany<Booking>().WithOne().HasForeignKey(x => x.UserId);
            base.OnModelCreating(builder);
        }
    }
}
