using Application.Interfaces;
using Quartz;

namespace Infrastructure.Jobs;

public class SeederJob(ISeederService seederService) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        await seederService.SeedUsersAsync();
        await seederService.SeedCategories();
        await seederService.SeedProducts();
    }
}
