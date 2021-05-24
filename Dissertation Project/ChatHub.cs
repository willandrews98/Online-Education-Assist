using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendTask(string message)
        {
            await Clients.All.SendAsync("ReceiveTaskMessage", message);
        }

        public async Task CompTask(string user, string type)
        {
            await Clients.All.SendAsync("ComplateTask", user, type);
        }

    }
}
