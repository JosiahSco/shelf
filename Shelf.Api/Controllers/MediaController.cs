using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shelf.Api.Data;
using Shelf.Api.Models;

namespace Shelf.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MediaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetAllMedia()
        {
            var media = await _context.Media.ToListAsync();
            return Ok(media);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media>> GetMediaById(int id)
        {
            var media = await _context.Media.FindAsync(id);
            if (media == null)
            {
                return NotFound();
            }
            return Ok(media);
        }

        [HttpPost]
        public async Task<ActionResult<Media>> CreateMedia(Media media)
        {
            _context.Media.Add(media);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMediaById), new { id = media.Id }, media);
        }
    }
}