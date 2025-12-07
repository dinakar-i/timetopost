using System.Text;
using System.Text.Json;
namespace Infrastructure;

public static class CommonService
{
    public static StringContent BuildJsonBody<T>(T data)
    {
        string json = JsonSerializer.Serialize(data);
        return new StringContent(json, Encoding.UTF8, "application/json");
    }
    public static bool IsValidRole(string role)
    {
        return role.ToLower() == OrganizationRole.Owner.ToString().ToLower() ||
               role.ToLower() == OrganizationRole.Admin.ToString().ToLower() ||
               role.ToLower() == OrganizationRole.Editor.ToString().ToLower() ||
               role.ToLower() == OrganizationRole.Viewer.ToString().ToLower();
    }
}