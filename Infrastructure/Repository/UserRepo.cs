using Core.Users;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly StoreContext _context;
        private readonly TokenService _tokenService;

        public UserRepo(StoreContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public bool UserExists(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }
        public bool UserExists(int userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }
        public Status RegisterUser(SignUpDto user)
        {
            if (user == null) return Status.Failed;
            else if (!_tokenService.IsValidEmail(user.Email) || UserExists(user.Email)) return Status.Unauthorized;
            else if (user.Password.Length < 8) return Status.NotValid;
            else
            {

                var newUser = new User
                {
                    Email = user.Email,
                    FullName = user.FullName,
                    PasswordHash = _tokenService.HashPassword(user.Password),
                };
                if (string.IsNullOrEmpty(newUser.PasswordHash)) return Status.NotValid;
                _context.Users.Add(newUser);
            }
            _context.SaveChanges();
            return Status.Succeeded;
        }
        public Status LoginUser(SignInDto user)
        {
            if (!_tokenService.IsValidEmail(user.Email)) return Status.Unauthorized;
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (existingUser == null) return Status.NotFound;
            bool isPasswordValid = _tokenService.VerifyPassword(existingUser.PasswordHash, user.Password);
            if (!isPasswordValid) return Status.Unauthorized;
            return Status.Succeeded;
        }
        public User? GetUserByEmail(string email)
        {
            return _context.Users
         .Include(u => u.OrganizationRoles)
         .FirstOrDefault(u => u.Email == email);
        }
        public User? GetUserById(int userId)
        {
            return _context.Users
         .Include(u => u.OrganizationRoles)
         .FirstOrDefault(u => u.Id == userId);
        }
    }
}