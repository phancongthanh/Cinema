using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Data
{
    public class CinemaContext : IdentityDbContext
    {
        public CinemaContext (DbContextOptions<CinemaContext> options)
            : base(options)
        {
        }

        public DbSet<Entities.Room> Rooms => Set<Entities.Room>();

        public DbSet<Entities.Seat> Seats => Set<Entities.Seat>();

        public DbSet<Entities.Film> Films => Set<Entities.Film>();

        public DbSet<Entities.Schedule> Schedules => Set<Entities.Schedule>();

        public DbSet<Entities.Ticket> Tickets => Set<Entities.Ticket>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Entities.Room>().ToTable(nameof(Entities.Room)).HasKey(x => x.RoomId);
            builder.Entity<Entities.Seat>().ToTable(nameof(Entities.Seat)).HasKey(x => x.SeatId);
            builder.Entity<Entities.Room>().HasMany(x => x.Seats).WithOne().HasForeignKey(x => x.RoomId);

            builder.Entity<Entities.Film>().ToTable(nameof(Entities.Film)).HasKey(x => x.FilmId);

            builder.Entity<Entities.Schedule>().ToTable(nameof(Entities.Schedule)).HasKey(x => x.ScheduleId);
            builder.Entity<Entities.Ticket>().ToTable(nameof(Entities.Ticket)).HasKey(x => x.TicketID);
            builder.Entity<Entities.Schedule>().HasMany<Entities.Ticket>().WithOne().HasForeignKey(x => x.ScheduleId);

            builder.Entity<Entities.Film>().HasMany<Entities.Schedule>().WithOne().HasForeignKey(x => x.FilmId);
            builder.Entity<Entities.Room>().HasMany<Entities.Schedule>().WithOne().HasForeignKey(x => x.RoomId);
            builder.Entity<Entities.Seat>().HasMany<Entities.Ticket>().WithOne().HasForeignKey(x => x.SeatId);

            base.OnModelCreating(builder);
        }
    }
}
