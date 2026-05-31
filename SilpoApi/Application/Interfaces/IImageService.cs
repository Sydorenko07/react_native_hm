using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces;

public interface IImageService
{
    Task<string> SaveImageAsync(IFormFile file);
    Task<string> SaveImageFromUrlAsync(string imageUrl);
    Task<string> SaveImageFromBase64Async(string input);
    Task DeleteImageAsync(string name);
}
