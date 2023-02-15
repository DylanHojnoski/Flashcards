using Flashcards.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Flashcards.Controller {
  [Route("api/[controller]")]
  [ApiController]

    public class UserController : ControllerBase {

      private readonly DataContext _context;

      public UserController(DataContext context) {
        this._context = context;
      }

      [HttpGet]
      public async Task<ActionResult<List<User>>> GetUsers() {
        return Ok(await _context.Users.ToListAsync());
      }


      [HttpPost]
      public async Task<ActionResult<List<User>>> CreateUser(User user) {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(await _context.Users.ToListAsync());
      }

      [HttpPut]
      public async Task<ActionResult<List<User>>> UpdateUser(User user) {
        var dbUser = await _context.Users.FindAsync(user.Id);
        if (dbUser == null) {
          return BadRequest("User not found.");
        }

        dbUser.Name = user.Name;
        dbUser.Email = user.Email;

        await _context.SaveChangesAsync();
        return Ok(await _context.Users.ToListAsync());
      }
      
      [HttpDelete("{id}")]
      public async Task<ActionResult<List<User>>> DeleteUser(User user) {
        var dbUser = await _context.Users.FindAsync(user.Id);
        if (dbUser == null) {
          return BadRequest("User not found.");
        }

        _context.Users.Remove(dbUser);
        await _context.SaveChangesAsync();
        return Ok(await _context.Users.ToListAsync());
      }
    }
}
