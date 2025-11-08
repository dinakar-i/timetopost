using Microsoft.EntityFrameworkCore;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.HttpOverrides;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<StoreContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IOrganizationRepo, OrganizationRepo>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS - safe parsing of origins (can be a comma-separated list in config)
var frontendOrigins = builder.Configuration
    .GetValue<string>("redirectUrls:frontend")?
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? new[] { "https://localhost:5129" };


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(frontendOrigins) // exact origins required when AllowCredentials() is used
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // required if client sends cookies / withCredentials
    });
});

// Trust forwarded headers from reverse proxy (X-Forwarded-For, X-Forwarded-Proto)
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    // If behind a trusted proxy, add KnownProxies / KnownNetworks instead of clearing
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
// }).AddCookie(options =>
// {
//     options.Cookie.SameSite = SameSiteMode.None;
//     options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
// }).AddGoogle(options =>
// {
//     options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//     options.ClientId = builder.Configuration["Google:ClientId"] ?? "your-client-id";
//     options.ClientSecret = builder.Configuration["Google:ClientSecret"] ?? "your-client-secret";
//     options.CallbackPath = "/signin-google";
// });

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["CustomKeys:Jwt:Issuer"],
        ValidAudience = builder.Configuration["CustomKeys:Jwt:Audience"],
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["CustomKeys:Jwt:Key"] ?? "default_key_which_is_at_least_32_chars_long"))
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = ctx =>
        {
            ctx.Token = ctx.Request.Cookies["_postigo.invite"];
            return Task.CompletedTask;
        }
    };
});
builder.Services.AddAuthorization();
var app = builder.Build();

// IMPORTANT: enable CORS before authentication/authorization and before endpoints
app.UseCors("AllowFrontend");

app.UseForwardedHeaders();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
