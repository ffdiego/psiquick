using Microsoft.EntityFrameworkCore;
using psiquick.Database;
using psiquick.Models;

namespace psiquick.Services;

public class PacienteService
{
    private readonly PsiDbContext psiDbContext;

    public PacienteService(PsiDbContext psiDbContext)
    {
        this.psiDbContext = psiDbContext;
    }

    public IEnumerable<Paciente> GetPacientes()
    {
        IEnumerable<Paciente> pacientes = psiDbContext.Pacientes.Include(o => o.Doencas);

        return pacientes;
    }
}
