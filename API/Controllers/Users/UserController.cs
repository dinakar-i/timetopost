using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly StoreContext _context;
        public UsersController(StoreContext context)
        {
            _context = context;
        }


        // GET: api/users/details
        [HttpGet]
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
    }
}
