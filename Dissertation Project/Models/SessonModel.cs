using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project.Models
{
    public class SessonModel
    {
        public Guid SessonId { get; set; }

        public List<Guid> Teachers { get; set; }

        public List<Guid> Students { get; set; }

        public SessonModel()
        {
            SessonId = new Guid();
            Teachers = new List<Guid>();
            Students = new List<Guid>();
        }
    }
}
