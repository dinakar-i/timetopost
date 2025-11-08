using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Core.Organizations;
namespace Core.Users;

[Table("users")]
public class User
{

    public int Id { get; set; }
    public string Email { get; set; } = default!;
    public string FullName { get; set; } = default!;
    [JsonIgnore]
    public string PasswordHash { get; set; } = default!;
    public ICollection<UserOrganizationRole> OrganizationRoles { get; set; } = new List<UserOrganizationRole>();
    public string? RefreshToken { get; set; } = default!;
    public DateTime? RefreshTokenExpiryTime { get; set; }
}
