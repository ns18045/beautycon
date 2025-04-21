using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using beauty.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace beauty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BeautyDbContext _context;

        public UsersController(BeautyDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<List<UserDetail>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            var detailUsers = new List<UserDetail>();
            foreach (var u in users) {
                detailUsers.Add(new UserDetail()
                { 
                    Adress = u.Adress,
                    Description = u.Description,
                    Email = u.Email,
                    Id = u.Id,
                    Name = u.Name,
                    Password = u.Password,
                    PhoneNumber = u.PhoneNumber,
                    Role = u.Role,
                    Service = u.Service,
                    Surname = u.Surname,
                    Rating =  0
                });

            }

            return detailUsers;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Users/Email
        [HttpPost("Email")]
        public async Task<ActionResult<bool>> GetUserByEmail(UserById data)
        {
            var user = await _context.Users.FirstAsync(u => u.Email == data.Email);

            if (user != null)
            {
                return true;
            }
            else 
            { 
                return false;
            }               
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var userid = _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Users/login
        [HttpPost("login")]
        public async Task<ActionResult<int>> Login(LoginUser loginUser)
        {
            var userExist = await _context.Users.AnyAsync(x => x.Password == loginUser.Password && x.Email == loginUser.Username);


            if (userExist)
            {
                var user = await _context.Users.FirstAsync(x => x.Password == loginUser.Password && x.Email == loginUser.Username);

                var currentUser = new CurrentUser()
                {
                    Email = user.Email,
                    Id = user.Id,
                    Role = user.Role
                };

                _context.CurrentUser.Add(currentUser);
                await _context.SaveChangesAsync();
                return user.Id;
            }
            else {
                return 0;
            }

            
        }

        // GET: api/Users/current
        [HttpGet("current")]
        public async Task<ActionResult<CurrentUser>> Current()
        {
            var user = await _context.CurrentUser.FirstAsync();

            if (user.Id == null) {
                user = new CurrentUser()
                {
                    Id = 0,
                    Email = "guest",
                    Role = "guest"
                };
            }

            return user;
        }

        // GET: api/Users/logout
        [HttpGet("logout")]
        public async Task<ActionResult<int>> Logout()
        {
            var user = await _context.CurrentUser.FirstAsync();

            if (user == null)
            {
                return NotFound();
            }

            _context.CurrentUser.Remove(user);

            await _context.SaveChangesAsync();

            return user.Id;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
