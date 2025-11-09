using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Infrastructure.Repository;
using Core.Users;
using Microsoft.AspNetCore.Authorization;
namespace API.Controllers.Users
{
    [Authorize]
    [Route("account")]
    public class AccountController : ControllerBase
    {
        private TokenService tokenService;
        private IUserRepo _userRepo;
        private readonly IConfiguration _configuration;
        public AccountController(IUserRepo userRepo, IConfiguration configuration)
        {
            tokenService = new TokenService(configuration);
            _userRepo = userRepo;
            _configuration = configuration;
        }
        // Step 1️⃣: Trigger Google Login
        [HttpGet("signin-google")]
        public IActionResult SignInWithGoogle()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleResponse") // After login, go here
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        // Step 2️⃣: Handle Google OAuth Callback
        [HttpGet("GoogleResponse")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!result.Succeeded || result.Principal == null)
            {
                return Forbid();
            }
            return Redirect($"{_configuration["redirectUrls:frontend"]}/app");
        }
        [AllowAnonymous]
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] SignUpDto signUpDto)
        {

            switch (_userRepo.RegisterUser(signUpDto))
            {
                case Status.Unauthorized:
                    return Unauthorized("This email is already registered");
                case Status.NotValid:
                    return BadRequest("Password must be at least 8 characters long");
                case Status.Failed:
                    return BadRequest("Registration Failed");
                case Status.Succeeded:
                    User user = _userRepo.GetUserByEmail(signUpDto.Email)!;
                    SetTokenCookie(tokenService.GenerateJwtToken(user.Email, user.FullName));
                    return Ok(new { message = "User Registered" });
                default:
                    return BadRequest();
            }
        }
        [AllowAnonymous]
        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] SignInDto signInDto)
        {
            switch (_userRepo.LoginUser(signInDto))
            {
                case Status.Unauthorized:
                    return Unauthorized("Invalid credentials");
                case Status.NotFound:
                    return NotFound("User not found");
                case Status.Succeeded:
                    User user = _userRepo.GetUserByEmail(signInDto.Email)!;
                    SetTokenCookie(tokenService.GenerateJwtToken(user.Email, user.FullName));
                    return Ok(new { message = "Login successfully" });
                default:
                    return BadRequest();
            }
        }
        [Authorize]
        [HttpDelete("signout")]
        public IActionResult SignOutt()
        {
            Response.Cookies.Delete("_postigo.invite");
            return Ok();
        }
        private void SetTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["CustomKeys:Jwt:ExpiryMinutes"] ?? "60")),
                Secure = true,
                SameSite = SameSiteMode.None
            };
            Response.Cookies.Append("_postigo.invite", token, cookieOptions);
        }
    }
}
