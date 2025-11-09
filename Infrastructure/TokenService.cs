using System.IdentityModel.Tokens.Jwt;  // For JwtRegisteredClaimNames, JwtSecurityToken, JwtSecurityTokenHandler
using System.Security.Claims;           // For Claim
using Microsoft.IdentityModel.Tokens;   // For SymmetricSecurityKey, SigningCredentials, SecurityAlgorithms
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;
namespace Infrastructure;

public class TokenService
{
    private readonly IConfiguration _configuration;
    private string GetJwtKey() => _configuration["CustomKeys:Jwt:Key"] ?? string.Empty;
    private int GetJwtExpiryMinutes() => int.Parse(_configuration["CustomKeys:Jwt:ExpiryMinutes"] ?? "60");
    private string GetJwtIssuer() => _configuration["CustomKeys:Jwt:Issuer"] ?? string.Empty;
    private string GetJwtAudience() => _configuration["CustomKeys:Jwt:Audience"] ?? string.Empty;
    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string GenerateJwtToken(string email, string name)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, email),
            new Claim(ClaimTypes.Actor, name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GetJwtKey()));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: GetJwtIssuer(),
            audience: GetJwtAudience(),
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(GetJwtExpiryMinutes()),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var randomBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }
    }
    public string HashPassword(string password)
    {
        var key = _configuration["CustomKeys:PasswordHashingKey"];
        if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(key)) return string.Empty;
        var hasher = new PasswordHasher<String>();
        var hashedPassword = hasher.HashPassword(key, password);
        return hashedPassword;
    }
    public bool VerifyPassword(string hashedPassword, string providedPassword)
    {
        var key = _configuration["CustomKeys:PasswordHashingKey"];
        if (string.IsNullOrEmpty(hashedPassword) || string.IsNullOrEmpty(providedPassword) || string.IsNullOrEmpty(key)) return false;
        var hasher = new PasswordHasher<String>();
        var result = hasher.VerifyHashedPassword(key, hashedPassword, providedPassword);
        return result == PasswordVerificationResult.Success;
    }

    public bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return false;

        string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        return Regex.IsMatch(email, pattern, RegexOptions.IgnoreCase);
    }
}
