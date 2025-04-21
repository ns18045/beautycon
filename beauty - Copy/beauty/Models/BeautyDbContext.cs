using Microsoft.EntityFrameworkCore;
using beauty.Models;

namespace beauty.Models
{
    public class BeautyDbContext: DbContext
    {
        public BeautyDbContext(DbContextOptions<BeautyDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserFeedback> UserFeedbacks { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<CurrentUser> CurrentUser { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
