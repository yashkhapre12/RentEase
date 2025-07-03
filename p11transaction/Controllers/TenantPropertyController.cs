using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using p11transaction.Models;

namespace p11transaction.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TenantPropertyController : ControllerBase
    {
        private readonly RenteaseContext _context;
        public TenantPropertyController(RenteaseContext context)
        {
            _context = context;
        }

        //Shortlist
        [HttpPost("shortlist")]
        public IActionResult ShortlistProperty(int userId, int propertyId)
        {
            // Check if the user exists
            var userExists = _context.Users.Any(u => u.Userid == userId);
            if (!userExists)
            {
                return NotFound(new { message = "User not found" });
            }

            // Check if the property exists
            var propertyExists = _context.Properties.Any(p => p.Propertyid == propertyId);
            if (!propertyExists)
            {
                return NotFound(new { message = "Property not found" });
            }

            // Check if the property is already shortlisted by the user
            var existingShortlist = _context.Tenantproperties
                .FirstOrDefault(tp => tp.Userid == userId && tp.Propertyid == propertyId);

            if (existingShortlist != null)
            {
                return BadRequest(new { message = "Property already shortlisted" });
            }

            // Save new shortlist entry
            var tenantProperty = new Tenantproperty
            {
                Userid = userId,
                Propertyid = propertyId,
                Shortlistedat = DateTime.UtcNow,
                Status = 1 // Assuming 1 means 'Active'
            };

            _context.Tenantproperties.Add(tenantProperty);
            _context.SaveChanges();

            return Ok(new { message = "Property shortlisted successfully" });
        }


        // GET: /TenantProperty/users-by-property/{propertyId}
        [HttpGet("users-by-property/{propertyId}")]
        public IActionResult GetUsersByProperty(int propertyId)
        {
            // Check if the property exists
            var propertyExists = _context.Properties.Any(p => p.Propertyid == propertyId);
            if (!propertyExists)
            {
                return NotFound(new { message = "Property not found" });
            }

            // Get users who shortlisted the given property
            var users = _context.Tenantproperties
                .Where(tp => tp.Propertyid == propertyId)
                .Include(tp => tp.User) // Load user details
                .Select(tp => new
                {
                    tp.User.Userid,
                    tp.User.Firstname,
                    tp.User.Lastname,
                    tp.User.Email,
                    tp.User.Contact,
                    tp.User.Address,
                    ShortlistedAt = tp.Shortlistedat
                })
                .ToList();

            if (users.Count == 0)
            {
                return NotFound(new { message = "No users found for this property" });
            }

            return Ok(users);
        }
    }
}
