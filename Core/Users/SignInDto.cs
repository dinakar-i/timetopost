using System;

namespace Core.Users;

public class SignInDto
{
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
}
