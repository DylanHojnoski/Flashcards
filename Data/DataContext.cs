using Microsoft.EntityFrameworkCore;

namespace Flashcards.Data {
  public class DataContext : DbContext {

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Stack> Stacks => Set<Stack>();
    public DbSet<Card> Cards => Set<Card>();
  }
}
