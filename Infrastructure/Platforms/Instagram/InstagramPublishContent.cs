using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Platforms;

public class InstagramPublishContent : IInstagramPublishContent
{
    private readonly IConfiguration _configuration;
    private readonly IInstagramUserProfile _instagramUserProfile;
    private readonly HttpClient _httpClient;
    public InstagramPublishContent(IConfiguration configuration, IInstagramUserProfile instagramUserProfile)
    {
        _configuration = configuration;
        _instagramUserProfile = instagramUserProfile;
        _httpClient = new HttpClient();
    }
    private string GetApiVersion() => _configuration["platformKeys:Instagram:api_version"] ?? "v21.0";
    private string GetUserId() => _instagramUserProfile.GetUserId() ?? string.Empty;
    private string GetAccessToken() => "IGAAIppcJ2EahBZAFM4YnNSRVA0OTNtb2I3a2ZALUWRDWks1M0M3c3ZAyX1g0a0lDaGk0c01ySjRnZATJlTTRubF9xSm5nM3BZAUk9jZAXdMQ1JXVXBGVTJBU0RwZADBDMnpaS184QkxqazlpcGEtNWNUVFlmdFZAzM294VWxYLUVKNlVoRQZDZD";
    public async Task<string> CreateImageContainer(InstagramImageContainer post)
    {
        string url = $"https://graph.instagram.com/{GetApiVersion()}/{GetUserId()}/media";
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAccessToken());
        var body = CommonService.BuildJsonBody(post);
        HttpResponseMessage res = await _httpClient.PostAsync(url, body);
        string responseContent = await res.Content.ReadAsStringAsync();
        return responseContent;
    }
    public async Task<string> CreateCarouselContainer(InstagramCarouselContainer post)
    {
        string url = $"https://graph.instagram.com/{GetApiVersion()}/{GetUserId()}/media";
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAccessToken());
        var body = CommonService.BuildJsonBody(post);
        HttpResponseMessage res = await _httpClient.PostAsync(url, body);
        string responseContent = await res.Content.ReadAsStringAsync();
        return responseContent;
    }
    public async Task<string> PublishMedia(string creationId)
    {
        string url = $"https://graph.instagram.com/{GetApiVersion()}/{GetUserId()}/media_publish";
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAccessToken());
        var payload = new { creation_id = creationId };
        var body = CommonService.BuildJsonBody(payload);
        HttpResponseMessage res = await _httpClient.PostAsync(url, body);
        string responseContent = await res.Content.ReadAsStringAsync();
        return responseContent;
    }
}