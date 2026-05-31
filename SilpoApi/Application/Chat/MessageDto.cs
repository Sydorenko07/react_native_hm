using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Chat;

public class MessageDto
{
    public string Name { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}
