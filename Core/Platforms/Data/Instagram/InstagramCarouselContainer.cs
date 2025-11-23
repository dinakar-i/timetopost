
public class InstagramCarouselContainer
{
    // Required
    public string media_type = "CAROUSEL";
    public List<string> children { get; set; } = new List<string>();
    // Optional
    public string? Caption { get; set; }

    public string? LocationId { get; set; }

    public List<UserTag>? UserTags { get; set; }
}

