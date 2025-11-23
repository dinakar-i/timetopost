public class InstagramImageContainer
{
    // Required
    public string image_url { get; set; } = string.Empty;

    // Optional
    public string? caption = null;

    public string? location_id = null;

    public List<UserTag>? user_tags = null;
}


