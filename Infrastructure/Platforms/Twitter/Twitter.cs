using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Nodes;


namespace Infrastructure.Platforms.Twitter;

public class Twitter
{
    private static readonly HttpClient _httpClient = new HttpClient();

    public async Task<string> GetBearerTokenAsync()
    {
        var apiKey = "4FGhmivaX4W6PNeDF6zdpZtwR";
        var apiSecretKey = "R24sYDahYHCru7RJF1i5oKiatQhY70cK6WrhVGbyt2hIbci5mi";
        var bearerTokenCredentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecretKey}"));
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", bearerTokenCredentials);
        var requestBody = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");
        var response = await _httpClient.PostAsync("https://api.twitter.com/oauth2/token", requestBody);
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var json = JsonNode.Parse(content);

        return (json?["access_token"] != null) ? json["access_token"]!.ToString() : string.Empty;
    }
}
