using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Identity;

public class RoleEntity : IdentityRole<long>
{
    public RoleEntity() : base() { }

    public RoleEntity(string roleName) : base(roleName) { }
    public virtual ICollection<UserRoleEntity>? UserRoles { get; set; } = new List<UserRoleEntity>();
}
