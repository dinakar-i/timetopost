public interface IInstagramPublishContent
{
    Task<string> CreateImageContainer(InstagramImageContainer post);
    Task<string> CreateCarouselContainer(InstagramCarouselContainer post);
    Task<string> PublishMedia(string creationId);
}
