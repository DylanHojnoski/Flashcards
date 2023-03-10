using Flashcards.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Flashcards.Controller {
  [Route("api/[controller]")]
  [ApiController]

    public class StackController : ControllerBase {

      private readonly DataContext _context;

      public StackController(DataContext context) {
        this._context = context;
      }


      [HttpGet]
      public async Task<ActionResult<List<Stack>>> GetStacks() {
        return Ok(await _context.Stacks.ToListAsync());
      }

      [HttpGet("PublicStacks")]
      public async Task<ActionResult<List<Stack>>> GetPublicStacks() {
        return Ok(await _context.Stacks.Where<Stack>((stack) => (stack.Public == true)).ToListAsync());
      }

      [Authorize(Policy = "User")]
      [HttpGet("UserStacks")]
      public async Task<ActionResult<List<Stack>>> GetUserStacks() {
        var id = HttpContext.User.Identity.Name;
        if (id != null) {

        return Ok(await _context.Stacks.Where<Stack>((stack) => (stack.UserId == int.Parse(id))).ToListAsync());
        }
        return BadRequest("Not Signed In") ;
      }

      [Authorize(Policy = "User")]
      [HttpPost]
      public async Task<ActionResult<List<Stack>>> CreateStack(Stack stack) {
        var id = HttpContext.User.Identity.Name;
        if (id != null) {
          stack.UserId = int.Parse(id);
          _context.Stacks.Add(stack);
          await _context.SaveChangesAsync();
          return Ok(await _context.Stacks.ToListAsync());
        }
        return BadRequest("Not Signed In") ;
      }

      [HttpPut]
      public async Task<ActionResult<List<Stack>>> UpdateStack(Stack stack) {
        var dbStack = await _context.Stacks.FindAsync(stack.Id);
        if (dbStack == null) {
          return BadRequest("Stack not found.");
        }

        dbStack.Name = stack.Name;
        dbStack.Tag = stack.Tag;
        dbStack.Public = stack.Public;

        await _context.SaveChangesAsync();
        return Ok(await _context.Stacks.ToListAsync());
      }
      
      [HttpDelete("{id}")]
      public async Task<ActionResult<List<Stack>>> DeleteStack(int id) {
        var dbStack = await _context.Stacks.FindAsync(id);
        if (dbStack == null) {
          return BadRequest("Stack not found.");
        }

        var ownedCards = _context.Cards.Where<Card>((card) => (card.StackId.Equals(id)));
        foreach (Card card in ownedCards) {
          _context.Cards.Remove(card);
        }
        _context.Stacks.Remove(dbStack);
        await _context.SaveChangesAsync();
        return Ok(await _context.Stacks.ToListAsync());
      }
    }
}
