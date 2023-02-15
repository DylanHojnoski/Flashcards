
namespace Flashcards {
  public class Card {
    public int Id { get; set; }
    public int StackId { get; set; }
    public string question { get; set; } = string.Empty;
    public string answer { get; set; } = string.Empty;
  }
}
