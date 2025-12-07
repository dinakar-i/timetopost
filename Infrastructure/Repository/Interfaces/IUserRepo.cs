using Core;
using Core.Users;

namespace Infrastructure.Repository
{
    public interface IUserRepo
    {
        bool UserExists(string email);
        bool UserExists(int userId);
        Status RegisterUser(SignUpDto user);
        User? GetUserByEmail(string email);
        User? GetUserById(int userId);
        Status LoginUser(SignInDto user);
    }
}
