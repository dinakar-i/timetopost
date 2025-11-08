using System;
using Microsoft.EntityFrameworkCore;
using Core.Users;
using Core.Platforms;
using Core.Organizations;

namespace Infrastructure
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Organization> Organizations { get; set; } = default!;
        public DbSet<UserOrganizationRole> UserOrganizationRoles { get; set; } = default!;
        public DbSet<PlatformAccount> PlatformAccounts { get; set; } = default!;
    }
}
