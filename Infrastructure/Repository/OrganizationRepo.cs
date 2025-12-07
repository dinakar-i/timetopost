using Core.Organizations;
namespace Infrastructure.Repository
{
    public class OrganizationRepo : IOrganizationRepo
    {
        private readonly StoreContext _context;
        private readonly IUserRepo _userRepo;
        public OrganizationRepo(StoreContext context, IUserRepo userRepo)
        {
            _context = context;
            _userRepo = userRepo;
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


        public AddUserResult AddUserToOrganization(int organizationId, int userId, string role, int ownerId)
        {
            if (!_userRepo.UserExists(userId)) return new AddUserResult(false, null!, Status.NotFound);
            var ownerRole = GetUserRoleInOrganization(organizationId, ownerId);
            if (ownerRole == null || !ownerRole.Role.ToLower().Equals(OrganizationRole.Owner.ToString().ToLower())) return new AddUserResult(false, null!, Status.Forbid);
            var existingMember = _context.UserOrganizationRoles
                .FirstOrDefault(m => m.OrganizationId == organizationId && m.UserId == userId);
            if (existingMember != null) return new AddUserResult(false, null!, Status.Failed);
            if (!CommonService.IsValidRole(role)) return new AddUserResult(false, null!, Status.NotValid);
            var userOrganizationRole = new UserOrganizationRole
            {
                OrganizationId = organizationId,
                UserId = userId,
                Role = role
            };
            _context.UserOrganizationRoles.Add(userOrganizationRole);
            _context.SaveChanges();
            return new AddUserResult(true, new
            {
                userId,
                fullName = _userRepo.GetUserById(userId)?.FullName,
                role
            }, null);
        }
        public Status UpdateUserRoleInOrganization(int organizationId, int userId, string newRole, int ownerId)
        {
            if (!_userRepo.UserExists(userId)) return Status.NotFound;
            var ownerRole = GetUserRoleInOrganization(organizationId, ownerId);
            if (ownerRole == null || !ownerRole.Role.ToLower().Equals(OrganizationRole.Owner.ToString().ToLower())) return Status.Forbid;
            var member = _context.UserOrganizationRoles
                .FirstOrDefault(m => m.OrganizationId == organizationId && m.UserId == userId);
            if (member == null) return Status.NotFound;
            if (!CommonService.IsValidRole(newRole)) return Status.Forbid;
            member.Role = newRole;
            _context.SaveChanges();
            return Status.Succeeded;
        }
    }
}