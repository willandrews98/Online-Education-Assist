﻿using Microsoft.AspNetCore.SignalR;
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
            await Clients.Group(groupName).SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendTask(string message)
        {
            await Clients.All.SendAsync("ReceiveTaskMessage", message);
        }

        public async Task CompTask(string user, string type)
        {
            await Clients.All.SendAsync("ComplateTask", user, type);
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
