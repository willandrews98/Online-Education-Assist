using Dissertation_Project.Data;
using Dissertation_Project.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Dissertation_Project.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppData _context;

        public HomeController(ILogger<HomeController> logger, AppData context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var data =_context.Sessons;

            return View(await data.ToListAsync());
        }

        public async Task<IActionResult> Create(string host)
        {

            SessonModel Sesson = new SessonModel(); 

            Sesson.Id = new Guid();
            Sesson.Host = User.Identity.Name;

            _context.Add(Sesson);
            await _context.SaveChangesAsync();


            return RedirectToAction(nameof(Tutor), new { id = Sesson.Id });
        }

        public async Task<IActionResult> Tutor(Guid id)
        {
            var Sesson = from c in _context.Sessons select c;

            if (Sesson == null)
            {
                return NotFound();
            }

            Sesson = Sesson.Where(m => m.Id == id);

            return View(await Sesson.ToListAsync());
        }

        
        public async Task<IActionResult> Chat(Guid id)
        {
            var Sesson = from c in _context.Sessons select c;

            if (Sesson == null)
            {
                return NotFound();
            }

            Sesson = Sesson.Where(m => m.Id == id);
            

            return View(await Sesson.ToListAsync());
        }


        public async Task<IActionResult> Remove(Guid id)
        {
            var sessonModel = await _context.Sessons.FindAsync(id);
            _context.Sessons.Remove(sessonModel);
            await _context.SaveChangesAsync();


            return RedirectToAction(nameof(Index));
        }

        [AllowAnonymous]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
