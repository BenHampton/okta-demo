using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api_okta_demo.Controller;

[ApiController]
[Route("/api/profile")]
public class ProfileController : ControllerBase
{
    // Public — anyone can call this
    [HttpGet("public")]
    public IActionResult Public()
        => Ok(new { message = "This is public!" });

    // Protected — requires a valid Okta JWT
    [HttpGet("me")]
    [Authorize]
    public IActionResult GetMe()
    {
        // User.Identity is populated from the JWT claims
        var name  = User.Identity?.Name;
        var email = User.FindFirst("sub")?.Value;

        return Ok(new {
            message = "You are authenticated!",
            name,
            email
        });
    }
}