using Application.Interfaces;
using Bogus;
using Domain;
using Domain.Entities;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static Bogus.DataSets.Name;

namespace Application.Services;

public class SeederService(
    IImageService _imageService,
    AppDbContext context,
    UserManager<UserEntity> userManager) : ISeederService
{
    public async Task SeedUsersAsync()
    {
        await context.Database.MigrateAsync();

        if(await userManager.Users.AnyAsync())
        {
            return;
        }
        int count = 10;
        for (int i = 0; i < count; i++)
        {
            var faker = new Faker("uk");
            var gender = faker.PickRandom<Gender>();

            var user = new UserEntity
            {
                FirstName = faker.Name.FirstName(gender),
                LastName = faker.Name.LastName(gender),
                Email = faker.Internet.Email()
            };
            user.UserName = user.Email;
            await userManager.CreateAsync(user, "123456");
        }
    }

    public async Task SeedCategories()
    {
        if (await context.Categories.AnyAsync())
        {
            return;
        }


        var categoryFaker = new Faker<CategoryEntity>()
            .RuleFor(c => c.Id, f => 0)
            .RuleFor(c => c.Name, f => f.Commerce.Categories(1)[0]);

        var categories = categoryFaker.Generate(5);

        context.Categories.AddRange(categories);
        await context.SaveChangesAsync();
    }

    public async Task SeedProducts()
    {
        if (await context.Products.AnyAsync())
        {
            return;
        }

        var categories = await context.Categories.ToListAsync();

        var productFaker = new Faker<ProductEntity>()
            .RuleFor(p => p.Id, f => 0)
            .RuleFor(p => p.Name, f => f.Commerce.ProductName())
            .RuleFor(p => p.Price, f => decimal.Parse(f.Commerce.Price(5, 500)))
            .RuleFor(p => p.Category, f => f.PickRandom(categories));

        var products = productFaker.Generate(30);

        foreach (var product in products)
        {
            product.Image = await _imageService.SaveImageFromUrlAsync(
                $"https://picsum.photos/seed/{Guid.NewGuid()}/800/800"
            );
        }

        context.Products.AddRange(products);
        await context.SaveChangesAsync();
    }
}
