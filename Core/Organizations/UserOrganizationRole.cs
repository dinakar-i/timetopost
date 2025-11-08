using System;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Users;

namespace Core.Organizations;


[Table("userorganizationroles")]
public class UserOrganizationRole
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = default!;
    public int OrganizationId { get; set; }
    public Organization Organization { get; set; } = default!;
    public required string Role { get; set; } = default!;
}