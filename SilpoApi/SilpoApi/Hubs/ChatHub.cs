using Application.Chat;
using Microsoft.AspNetCore.SignalR;

namespace SilpoApi.Hubs;

public class ChatHub : Hub
{
    public async Task Send(MessageDto message)
    {
        await this.Clients.All.SendAsync("Send", message);
    }
}
