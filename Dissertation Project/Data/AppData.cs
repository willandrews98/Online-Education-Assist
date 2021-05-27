using Dissertation_Project.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project.Data
{
    public class AppData : DbContext
    {

        public DbSet<SessonModel> Sessons { get; set; }

        public AppData(DbContextOptions<AppData> options) : base(options)
        {

        }
    }
}
