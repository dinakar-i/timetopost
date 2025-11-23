using Microsoft.Extensions.Configuration;
using System.Text.Json;
namespace Infrastructure.Platforms;

public class InstagramUserProfile : IInstagramUserProfile
{
    private readonly IConfiguration _configuration;
    public InstagramUserProfile(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    private string GetApiVersion() => _configuration["platformKeys:Instagram:api_version"] ?? "v21.0";
    private string GetAccessToken() => "IGAAIppcJ2EahBZAFM4YnNSRVA0OTNtb2I3a2ZALUWRDWks1M0M3c3ZAyX1g0a0lDaGk0c01ySjRnZATJlTTRubF9xSm5nM3BZAUk9jZAXdMQ1JXVXBGVTJBU0RwZADBDMnpaS184QkxqazlpcGEtNWNUVFlmdFZAzM294VWxYLUVKNlVoRQZDZD";
    public string GetUserId()
    {
        string url = $"https://graph.instagram.com/{GetApiVersion()}/me";
        using (var httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAccessToken());
            var response = httpClient.GetAsync(url).Result;
            if (response.IsSuccessStatusCode)
            {
                var content = response.Content.ReadAsStringAsync().Result;
                var jsonDoc = JsonDocument.Parse(content);
                if (jsonDoc.RootElement.TryGetProperty("id", out JsonElement idElement))
                {
                    return idElement.GetString() ?? string.Empty;
                }
            }
        }
        return string.Empty;
    }
}