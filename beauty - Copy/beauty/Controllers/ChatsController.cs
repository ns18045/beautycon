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
    public class ChatsController : ControllerBase
    {
        private readonly BeautyDbContext _context;

        public ChatsController(BeautyDbContext context)
        {
            _context = context;
        }

        // GET: api/Chats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chat>>> GetChats()
        {
            return await _context.Chats.OrderBy(m => m.MasterSeen && m.ClientSeen).ToListAsync();
        }

        // GET: api/Chats/User/id
        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<Chat>>> GetChatsByUser(int id)
        {
            return await _context.Chats
                .OrderBy(m => m.MasterSeen || m.ClientSeen)
                .Where(t => t.MasterId == id || t.ClientId == id)
                .ToListAsync();
        }

        // GET: api/Chats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Chat>> GetChat(int id)
        {
            var chat = await _context.Chats.FindAsync(id);

            if (chat == null)
            {
                return NotFound();
            }

            return chat;
        }

        // GET: api/Chats/Messages/5
        [HttpGet("Messages/{id}")]
        public async Task<ActionResult<List<Message>>> GetChatMessages(int id)
        {
            var messages = await _context.Messages.OrderByDescending(m=>m.Id).Where(m => m.ChatId == id).ToListAsync();

            if (messages == null)
            {
                return NotFound();
            }

            return messages;
        }

        // POST: api/Chats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Chat>> PostChat(Chat chat)
        {
            var exists = _context.Chats.Any(c => c.MasterId == chat.MasterId && c.ClientId == chat.ClientId);
            if (!exists)
            {
                _context.Chats.Add(chat);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetChats", new { id = chat.Id }, chat);
            }
            else {
                return null;
            }
        }

        // POST: api/Chats/Message
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Message")]
        public async Task<ActionResult<Chat>> PostMessage(Message message)
        {
            
            _context.Messages.Add(message);

            await _context.SaveChangesAsync();

            return null;
            
        }
    }
}
