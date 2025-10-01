using System;
using System.IdentityModel.Tokens.Jwt;  // For JwtRegisteredClaimNames, JwtSecurityToken, JwtSecurityTokenHandler
using System.Security.Claims;           // For Claim
using Microsoft.IdentityModel.Tokens;   // For SymmetricSecurityKey, SigningCredentials, SecurityAlgorithms
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;                       // For Encoding.UTF8
namespace Infrastructure;

public class TokenService
{
    private readonly string _secretKey = "h6G8u3v9H1s7k2L4p0w8R3n5M2y1Z7Q4";
    public string GenerateJwtToken(string email, string name, int expiresInMinutes)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.UniqueName, name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "your-app-name",
            audience: "your-app-name",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
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
}
