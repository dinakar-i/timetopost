using Core.Organizations;
namespace Infrastructure.Repository
{
    public class OrganizationRepo : IOrganizationRepo
    {
        private readonly StoreContext _context;

        public OrganizationRepo(StoreContext context)
        {
            _context = context;
        }

        // Repository methods for Organization entity

        public object? GetUserOrganizations(int userid)
        {
            var organizations = _context.Organizations
                .Where(o => o.Members.Any(m => m.UserId == userid))
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

            return organizations;
        }
        public object? GetOrganizationsofUser(int userid)
        {
            var organizations = _context.Organizations
                .Where(o => o.Members.Any(m => m.UserId == userid && m.Role.ToLower() == OrganizationRole.Owner.ToString().ToLower()))
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

            return organizations;
        }
        public object? GetOrganizationsMembersById(int organizationId)
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

            return members;
        }

        public Status DeleteUserFromOrganaization(int userId, int organizationId, int ownerId)
        {
            var role = GetUserRoleInOrganization(organizationId, ownerId);
            if (role == null || userId == ownerId || !role.Role.ToLower().Equals(OrganizationRole.Owner.ToString().ToLower())) return Status.Forbid;
            var member = _context.UserOrganizationRoles.FirstOrDefault(ur => ur.OrganizationId == organizationId && userId == ur.UserId);
            if (member == null) return Status.NotFound;
            _context.UserOrganizationRoles.Remove(member);
            _context.SaveChanges();
            return Status.Succeeded;

        }

        public UserOrganizationRole? GetUserRoleInOrganization(int organizationId, int userId)
        {
            return _context.UserOrganizationRoles
        .FirstOrDefault(m => m.OrganizationId == organizationId && m.UserId == userId);
        }
    }
}