using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PIA.API.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PacienteController() : ControllerBase
{
    //private PlaneService planeService = planeService;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok();
    }
}

