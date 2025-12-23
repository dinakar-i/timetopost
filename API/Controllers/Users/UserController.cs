using System.Security.Claims;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers.Users
{
    [Authorize]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        public UsersController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            var userEmail = User?.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized(userEmail);
            }
            var user = _userRepo.GetUserByEmail(userEmail);
            if (user == null) return NotFound(userEmail);
            return Ok(user);
        }
    }
}
