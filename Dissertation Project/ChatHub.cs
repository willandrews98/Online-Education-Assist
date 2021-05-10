using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project
{
    public class ChatHub : Hub
    {

        public async Task Send(string name, string message)
        {

           await Clients.All.SendAsync("ReceiveMessage", name, message);

        }

    }
}
