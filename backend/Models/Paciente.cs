namespace psiquick.Models;

public class Paciente
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public DateTime? DataNascimento { get; set; }
    public DateTime? DataPrimeiraConsulta { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }

    public ICollection<Doenca> Doencas { get; set; }
}