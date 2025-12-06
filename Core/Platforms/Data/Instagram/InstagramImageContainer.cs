public class InstagramImageContainer
{
    // Required
    public string? image_url { get; set; } = string.Empty;

    // Optional
    public string? caption { get; set; } = null;

    public string? location_id { get; set; } = null;

    public List<UserTag>? user_tags { get; set; } = null;
}


