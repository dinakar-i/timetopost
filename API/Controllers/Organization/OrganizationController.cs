using Core.Organizations;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Organization
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private readonly IOrganizationRepo _organization;
        public OrganizationController(IOrganizationRepo organization)
        {
            _organization = organization;
        }
        [HttpGet("{userid}")]
        public IActionResult GetUserOrganizations(int userid)
        {
            var organization = _organization.GetUserOrganizations(userid);
            if (organization == null) return NotFound();
            return Ok(organization);
        }
        [HttpGet]
        [Route("roles")]
        public IActionResult GetOrganizationsMembersById(int organizationId)
        {
            var members = _organization.GetOrganizationsMembersById(organizationId);
            if (members == null) return NotFound();
            return Ok(members);
        }

        [HttpDelete("delete")]
        public IActionResult DeleteUserFromOrganaization(
           [FromQuery] int userId,
           [FromQuery] int organizationId,
           [FromQuery] int ownerId)
        {
            switch (_organization.DeleteUserFromOrganaization(userId, organizationId, ownerId))
            {
                case Status.Succeeded:
                    return Ok("User Deleted");
                case Status.Forbid:
                    return Forbid();
                default:
                    return NotFound();
            }
        }
        [HttpPost("adduser")]
        public IActionResult AddUserToOrganization(
           [FromQuery] int userId,
           [FromQuery] int organizationId,
           [FromQuery] string role,
           [FromQuery] int ownerId)
        {
            var res = _organization.AddUserToOrganization(organizationId, userId, role, ownerId);
            if (!res.Success)
            {
                switch (res.Error)
                {
                    case Status.NotFound:
                        return NotFound("User or Organization not found");
                    case Status.Forbid:
                        return Forbid();
                    case Status.Failed:
                        return BadRequest("User is already a member of the organization");
                    default:
                        return BadRequest("Failed to add user to organization");
                }
            }
            return Ok(res.Data);
        }
        [HttpPut("updaterole")]
        public IActionResult UpdateUserRoleInOrganization(
           [FromQuery] int userId,
           [FromQuery] int organizationId,
           [FromQuery] string newRole,
           [FromQuery] int ownerId)
        {
            switch (_organization.UpdateUserRoleInOrganization(organizationId, userId, newRole, ownerId))
            {
                case Status.Succeeded:
                    return Ok("User Role Updated");
                case Status.Forbid:
                    return Forbid();
                default:
                    return NotFound();
            }
        }
        // [HttpGet("{organizationId}/role/{userId}")]
        [HttpGet("userrole")]
        public UserOrganizationRole? GetUserRoleInOrganization(int organizationId, int userId)
        {
            return _organization.GetUserRoleInOrganization(organizationId, userId);
        }

    }
}
