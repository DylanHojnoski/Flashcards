using Flashcards.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Flashcards.Controller {
  [Route("api/[controller]")]
  [ApiController]

    public class CardController : ControllerBase {

      private readonly DataContext _context;

      public CardController(DataContext context) {
        this._context = context;
      }

      [HttpGet]
      public async Task<ActionResult<List<Card>>> GetCards() {
        return Ok(await _context.Cards.ToListAsync());
      }

      [HttpGet("{Stack}"), ActionName("GetByStack")] 
      public async Task<ActionResult<List<Card>>> GetCardsInStack(Stack stack) {
        return Ok(await _context.Cards.Where(card => card.StackId.Equals(stack.Id)).ToListAsync());
      }

      [HttpPost]
      public async Task<ActionResult<List<Card>>> CreateCard(Card card) {
        _context.Cards.Add(card);
        await _context.SaveChangesAsync();
        return Ok(await _context.Cards.ToListAsync());
      }

      [HttpPut]
      public async Task<ActionResult<List<Card>>> UpdateCard(Card card) {
        var dbCard = await _context.Cards.FindAsync(card.Id);
        if (dbCard == null) {
          return BadRequest("Card not found.");
        }

        dbCard.question = card.question;
        dbCard.answer = card.answer;

        await _context.SaveChangesAsync();
        return Ok(await _context.Cards.ToListAsync());
      }
      
      [HttpDelete("{id}")]
      public async Task<ActionResult<List<Card>>> DeleteCard(Card card) {
        var dbCard = await _context.Cards.FindAsync(card.Id);
        if (dbCard == null) {
          return BadRequest("Card not found.");
        }

        _context.Cards.Remove(dbCard);
        await _context.SaveChangesAsync();
        return Ok(await _context.Cards.ToListAsync());
      }
    }
}
