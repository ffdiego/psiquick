using Microsoft.EntityFrameworkCore;
using psiquick.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace psiquick.Database;

public class PsiDbContext : DbContext
{
    public DbSet<Paciente> Pacientes { get; set; } = null!;
    public DbSet<Doenca> Doencas { get; set; } = null!;

    public PsiDbContext(DbContextOptions<PsiDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Paciente>()
            .HasMany(p => p.Doencas)
            .WithMany();
    }
    
}
