using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace API.Controllers.Users
{
    public class UsersController : ControllerBase
    {
        private readonly StoreContext _context;
        public UsersController(StoreContext context)
        {
            _context = context;
        }


        // GET: api/users/details
        [HttpGet("users/details")]
        public IActionResult GetUsersWithOrgRoles()
        {
            var users = _context.Users
                .Include(u => u.OrganizationRoles)
                    .ThenInclude(ur => ur.Organization)
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    Roles = u.OrganizationRoles.Select(ur => new
                    {
                        ur.Role,
                        Organization = ur.Organization.Name
                    })
                })
                .ToList();

            return Ok(users);
        }
        [Authorize]
        [HttpGet("users/profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized();
            }

            var user = await _context.Users
                .Where(u => u.Email == email)
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
