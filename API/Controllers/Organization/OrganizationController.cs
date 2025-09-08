using Infrastructure;
using Microsoft.AspNetCore.Http;
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
        // GET: api/organization
        [HttpGet]
        public IActionResult GetOrganizations()
        {
            var organizations = _context.Organizations
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

    }
}
