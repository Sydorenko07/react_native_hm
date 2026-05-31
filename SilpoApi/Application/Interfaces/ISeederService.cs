namespace Application.Interfaces;

public interface ISeederService
{
    public Task SeedUsersAsync();
    public Task SeedCategories();
    public Task SeedProducts();
}
