using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Core;

namespace API.Controllers.Users
{
    public class AccountController : ControllerBase
    {
        private TokenService tokenService;
        private StoreContext _context;
        private readonly IConfiguration _configuration;
        public AccountController(StoreContext storeContext, IConfiguration configuration)
        {
            if (tokenService == null) tokenService = new TokenService();
            _context = storeContext;
            _configuration = configuration;
        }
        // Step 1️⃣: Trigger Google Login
        [HttpGet("signin")]
        public IActionResult Login()
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

            var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
            var name = result.Principal.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(name)) return NotFound();
            var accessToken = tokenService.GenerateJwtToken(email, name, expiresInMinutes: 15); // Short-lived
            var refreshToken = tokenService.GenerateRefreshToken(); // Random string

            // Save refreshToken in database linked to user
            //  await SaveRefreshTokenToDatabase(email, name, refreshToken);

            // Set refresh token in HttpOnly secure cookie
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
               // Domain = ".postigo.in",
                Expires = DateTime.UtcNow.AddDays(30) // Example: 30 days validity
            });

            // Return access token to frontend
            return Redirect($"{_configuration["redirectUrls:frontend"]}/app?token={accessToken}");

            // Or redirect to home page after login:
            // return RedirectToAction("Index", "Home");
        }
        private async Task SaveRefreshTokenToDatabase(string email, string name, string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(30); // Example: 30 days validity
                await _context.SaveChangesAsync();
            }
            else
            {
                // Optionally, create user if it doesn't exist
                user = new User
                {
                    Email = email,
                    FullName = name, // Or another source
                    RefreshToken = refreshToken,
                    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(30)
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("No refresh token provided.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token.");

            var newAccessToken = tokenService.GenerateJwtToken(user.Email, user.FullName, 15);

            return Ok(new { token = newAccessToken });
        }

    }
}
