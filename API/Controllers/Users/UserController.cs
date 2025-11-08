using Infrastructure;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers.Users
{
    public class UsersController : ControllerBase
    {
        private readonly StoreContext _context;
        public UsersController(StoreContext context)
        {
            _context = context;
        }


    }
}
