using Autofac.Features.ResolveAnything;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Users
{
    // [Route("api/[controller]")]
    // [ApiController]
    public class AccountController : ControllerBase
    {
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
            var accessToken = result.Properties.GetTokenValue("access_token");

            // You can save user info in your database here if needed

            return Ok(new
            {
                Email = email,
                Name = name,
                AccessToken = accessToken
            });

            // Or redirect to home page after login:
            // return RedirectToAction("Index", "Home");
        }

        // Step 3️⃣: Logout
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

    }
}
