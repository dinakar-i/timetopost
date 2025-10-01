using Core.Organizations;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Organization
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        StoreContext _context;
        public OrganizationController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet("{userid}")]
        public IActionResult GetUserOrganizations(int userid)
        {
            var organizations = _context.Organizations
                .Where(o => o.Members.Any(m => m.UserId == userid && m.Role.ToLower() == "owner"))
                .Select(o => new
                {
                    o.Id,
                    o.Name,
                    Members = o.Members.Select(m => new
                    {
                        m.UserId,
                        m.User.FullName,
                        m.Role
                    }),
                    Platforms = o.Platforms.Select(p => new
                    {
                        p.Id,
                        p.Platform,
                        p.AccessToken,
                        p.TokenExpiry
                    })
                })
                .ToList();

            return Ok(organizations);
        }
        [HttpGet]
        [Route("roles")]
        public IActionResult GetOrganizationsMembersById(int organizationId)
        {
            var members = _context.UserOrganizationRoles
                .Where(ur => ur.OrganizationId == organizationId)
                .Select(ur => new
                {
                    ur.UserId,
                    ur.User.FullName,
                    ur.Role
                })
                .ToList();

            return Ok(members);
        }

        [HttpDelete("delete")]
        public IActionResult DeleteUserFromOrganaization(
           [FromQuery] int userId,
           [FromQuery] int organizationId,
           [FromQuery] int ownerId)
        {
            var role = GetUserRoleInOrganization(organizationId, ownerId);
            if (role == null || userId == ownerId || !role.Role.ToLower().Equals(OrganizationRole.Owner.ToString().ToLower())) return Forbid();
            var member = _context.UserOrganizationRoles.FirstOrDefault(ur => ur.OrganizationId == organizationId && userId == ur.UserId);
            if (member == null) return NotFound();
            _context.UserOrganizationRoles.Remove(member);
            _context.SaveChanges();
            return Ok("User Deleted");

        }
        // [HttpGet("{organizationId}/role/{userId}")]
        private UserOrganizationRole? GetUserRoleInOrganization(int organizationId, int userId)
        {
            return _context.UserOrganizationRoles
        .FirstOrDefault(m => m.OrganizationId == organizationId && m.UserId == userId);
        }




    }
}
