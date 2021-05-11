using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project.Models
{
    public class ChatModel
    {
        public int Id { get; set; }

        public Guid Host { get; set; }

        public List<Guid> User { get; set; }

        public ChatModel()
        {
            User = new List<Guid>();
        }
    }
}
