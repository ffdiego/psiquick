using psiquick.Models;

namespace psiquick.Database;

public static class SeedInicialBD
{
    public static void InsereDadosMockados(PsiDbContext context)
    {
        if (!context.Doencas.Any())
        {
            string[] doencas = 
                [
                "Hiperatividade",
                "Desatenção",
                "Autismo",
                "Personalidade Esquizoide"
                ];

            context.Doencas.AddRange(doencas.Select(d => new Doenca() { Nome = d }));
            context.SaveChanges();
        }

        if (!context.Pacientes.Any())
        {
            var pacientes = new List<Paciente>()
            {
                new Paciente()
                {
                    Nome = "Hannibal",
                    DataNascimento = new DateTime(1990, 11, 8),
                },
                new Paciente()
                {
                    Nome = "Mr. Reed",
                    DataNascimento = new DateTime(1950, 1, 1)
                },
            };

            var doencas = context.Doencas.ToList();

            Doenca doencaAleatoriaPicker()
            {
                Random random = new Random();
                return doencas.ElementAt(random.Next(0, doencas.Count));
            }

            pacientes.ForEach(p => p.Doencas.Add(doencaAleatoriaPicker()));

            context.Pacientes.AddRange(pacientes);

            context.SaveChanges();
        }
    }
}
