using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string groupName, string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", groupName, user, message);
        }

        public async Task SendTask(string groupName,string message)
        {
            await Clients.All.SendAsync("ReceiveTaskMessage", groupName, message);
        }

        public async Task CompTask(string groupName,string user, string type)
        {
            await Clients.All.SendAsync("ComplateTask", groupName, user, type);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            Console.WriteLine($"{Context.ConnectionId} added to {groupName}");
        }

        public async Task RemoveToGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            Console.WriteLine($"{Context.ConnectionId} removed to {groupName}");
        }

        public async Task ClosingSesson(string groupName)
        {
            await Clients.All.SendAsync("CloseSesson", groupName);
            Console.WriteLine($"{groupName} is closeing sesson");
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception e)
        {
            await base.OnDisconnectedAsync(e);
        }

    }
}
