using Flashcards.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Flashcards.Controller {
  [Route("api/[controller]")]
  [ApiController]

    public class UserController : ControllerBase {

      private readonly AppSetting _applicationSettings;
      private readonly DataContext _context;

      public UserController(DataContext context, IOptions<AppSetting> _applicationSettings) {
        this._context = context;
        this._applicationSettings = _applicationSettings.Value;
      }

      [HttpGet]
      public async Task<ActionResult<List<User>>> GetUsers() {
        return Ok(await _context.Users.ToListAsync());
      }

      [HttpGet("GetUserByName/{name}")]
      public async Task<ActionResult<User>> GetUserByName(string name) {
        return Ok(await _context.Users.FirstOrDefaultAsync<User>(user => user.Name == name));
      }

      [Authorize(Policy = "User")]
      [HttpGet("GetCurrentUser")]
      public async Task<ActionResult<List<User>>> GetCurrentUser() {
        var id = HttpContext.User.Identity.Name;
        if (id != null) {
          return Ok(await _context.Users.FirstOrDefaultAsync<User>(user => user.Id == int.Parse(id)));
        }
        return BadRequest("Not Signed In") ;
      }

      [HttpPost]
      public async Task<ActionResult<List<User>>> CreateUser(User user) {
        if (_context.Users.Where<User>(users => users.Name == user.Name).FirstOrDefault() == null ) {
          return BadRequest("Name already taken");
        }
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(await _context.Users.ToListAsync());
      }

      [Authorize(Policy = "User")]
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

      [HttpPost("LoginWithGoogle")]
      public async Task<IActionResult> LoginWithGoogle([FromBody] string credential ) {

        var setting = new GoogleJsonWebSignature.ValidationSettings() {
          Audience = new List<string> {this._applicationSettings.GoogleClientId }
        };
        var payload = await GoogleJsonWebSignature.ValidateAsync(credential, setting);
        var user = await _context.Users.Where<User>(user => user.Email == payload.Email).FirstOrDefaultAsync();
        if (user != null) {
          generateToken(user);

          return Ok();
        }
        else {
          User newUser = new User();
          newUser.Name = payload.Name;
          newUser.Email = payload.Email;
          newUser.Role = "User";
          //newUser.Token = generateToken(newUser);
          generateToken(newUser);
          _context.Users.Add(newUser);
          await _context.SaveChangesAsync();
          return Ok();
        }
      }

      [HttpGet("Token")]
      public dynamic generateToken(User user) {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(this._applicationSettings.GoogleClientSecret);
        var tokenDescriptor = new SecurityTokenDescriptor {
          Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Id.ToString()), new Claim(ClaimTypes.Role, user.Role) }),
                  Expires = DateTime.UtcNow.AddDays(1),
                  SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var encrypterToken = tokenHandler.WriteToken(token);

        HttpContext.Response.Cookies.Append("token", encrypterToken,
            new CookieOptions
            {
            Expires = DateTime.Now.AddDays(1),
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.None,
            });

        return new {token = encrypterToken, name = user.Name};
      }

      [Authorize(Policy = "User")]
      [HttpGet("Logout")]
      public void Logout() {
        HttpContext.Response.Cookies.Delete("token");
        HttpContext.Response.Cookies.Append("token", "",
            new CookieOptions
            {
            Expires = DateTime.Now.AddDays(-10),
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.None,
            });
      }
    }

}
