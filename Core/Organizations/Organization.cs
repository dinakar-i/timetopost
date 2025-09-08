using System;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Organizations;
using Core.Platforms;
namespace Core;

[Table("organizations")]
public class Organization
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public ICollection<UserOrganizationRole> Members { get; set; } = new List<UserOrganizationRole>();
    public ICollection<PlatformAccount> Platforms { get; set; } = new List<PlatformAccount>();
}