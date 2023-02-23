using Microsoft.AspNetCore.Mvc;
using Flashcards.Data;
using Microsoft.EntityFrameworkCore;
using Google.Apis.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Flashcards.Controller {

  public class AuthController : ControllerBase {

    private readonly AppSetting _applicationSettings;

    public AuthController(IOptions<AppSetting> _applicationSettings) {
      this._applicationSettings = _applicationSettings.Value;
    }
    /*[HttpPost("Register")]
    public IActionResult Register([FromBody] Register model) {
      var user = new User();
    
    }*/

/*    [HttpPost("LoginWithGoogle")]
    public async Task<IActionResult> LoginWithGoogle([FromBody] string credential) {

      var setting = new GoogleJsonWebSignature.ValidationSettings() {
        Audience = new List<string> {this._applicationSettings.GoogleClientId }
      };
      UserController userController = new UserController();
      var payload = await GoogleJsonWebSignature.ValidateAsync(credential, setting);
      var user = userController.GetUserByName(payload.Name);
      if (user != null) {
        return Ok(generateToken(user));
      }
      else {
        return BadRequest();
      }
    }*/

    public dynamic generateToken(User user) {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(this._applicationSettings.GoogleClientId);
      var tokenDescriptor = new SecurityTokenDescriptor {
        Subject = new ClaimsIdentity(new[] { new Claim("name", user.Name) }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var encrypterToken = tokenHandler.WriteToken(token);

      return new {token = encrypterToken, name = user.Name};
    }
  }
}
