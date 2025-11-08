using Core;
using Core.Users;

namespace Infrastructure.Repository
{
    public interface IUserRepo
    {
        bool UserExists(string email);
        Status RegisterUser(SignUpDto user);
        User? GetUserByEmail(string email);
        Status LoginUser(SignInDto user);
    }
}
