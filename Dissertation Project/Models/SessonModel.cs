using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project.Models
{
    public class SessonModel
    {
        [Key]
        public Guid Id { get; set; }

        public string Host { get; set; }


    }
}
