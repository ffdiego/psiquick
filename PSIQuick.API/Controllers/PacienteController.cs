using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using psiquick.Services;

namespace PIA.API.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PacienteController(PacienteService service) : ControllerBase
{
    private readonly PacienteService service = service;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(service.GetPacientes());
    }
}

