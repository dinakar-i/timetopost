using Core.Organizations;

namespace Infrastructure.Repository
{
    public interface IOrganizationRepo
    {
        object? GetUserOrganizations(int userid);
        object? GetOrganizationsMembersById(int organizationId);
        Status DeleteUserFromOrganaization(int userId, int organizationId, int ownerId);
        UserOrganizationRole? GetUserRoleInOrganization(int organizationId, int userId);
        AddUserResult AddUserToOrganization(int organizationId,string userEmail, string role, int ownerId);
        public Status UpdateUserRoleInOrganization(int organizationId, int userId, string newRole, int ownerId);
    }
}
