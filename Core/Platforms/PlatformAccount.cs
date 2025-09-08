using System;

namespace Core.Platforms;

// public enum PlatformType
// {
//     Facebook, Instagram, Twitter, LinkedIn, YouTube
// }
public class PlatformAccount
{
    public int Id { get; set; }
    public required string Platform { get; set; }
    public string AccessToken { get; set; } = default!;
    public DateTime TokenExpiry { get; set; }
    public int OrganizationId { get; set; }
    public Organization Organization { get; set; } = default!;
    //public ICollection<Post> Posts { get; set; } = new List<Post>();
}