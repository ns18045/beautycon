using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using beauty.Models;

namespace beauty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFeedbacksController : ControllerBase
    {
        private readonly BeautyDbContext _context;

        public UserFeedbacksController(BeautyDbContext context)
        {
            _context = context;
        }

        // GET: api/UserFeedbacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFeedback>>> GetUserFeedbacks()
        {
            return await _context.UserFeedbacks.ToListAsync();
        }

        // GET: api/UserFeedbacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFeedback>> GetUserFeedback(int id)
        {
            var userFeedback = await _context.UserFeedbacks.FindAsync(id);

            if (userFeedback == null)
            {
                return NotFound();
            }

            return userFeedback;
        }

        // GET: api/UserFeedbacks/user/5
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<UserFeedback>>> GetUserFeedbackByUser(int id)
        {
            var userFeedback = await _context.UserFeedbacks.Where(x=>x.UserId == id).ToListAsync();

            if (userFeedback == null)
            {
                return NotFound();
            }

            return userFeedback;
        }

        // PUT: api/UserFeedbacks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserFeedback(int id, UserFeedback userFeedback)
        {
            if (id != userFeedback.Id)
            {
                return BadRequest();
            }

            _context.Entry(userFeedback).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFeedbackExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserFeedbacks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserFeedback>> PostUserFeedback(UserFeedback userFeedback)
        {
            _context.UserFeedbacks.Add(userFeedback);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserFeedback", new { id = userFeedback.Id }, userFeedback);
        }

        // DELETE: api/UserFeedbacks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserFeedback(int id)
        {
            var userFeedback = await _context.UserFeedbacks.FindAsync(id);
            if (userFeedback == null)
            {
                return NotFound();
            }

            _context.UserFeedbacks.Remove(userFeedback);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserFeedbackExists(int id)
        {
            return _context.UserFeedbacks.Any(e => e.Id == id);
        }
    }
}
