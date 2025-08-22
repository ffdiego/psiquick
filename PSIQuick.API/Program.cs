using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using psiquick.Database;
using psiquick.Services;
using System;
using System.Text;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constantes.JWTKey))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()   // aceita qualquer frontend
            .AllowAnyMethod()   // GET, POST, PUT, DELETE...
            .AllowAnyHeader();  // Authorization, Content-Type...
    });
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddDbContext<PsiDbContext>(options => options.UseSqlite("Data Source=meubanco.db"));

builder.Services.AddScoped<PacienteService>();


WebApplication app = builder.Build();

if (app.Environment.IsDevelopment()) { }

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PsiDbContext>();
    db.Database.EnsureCreated();
    SeedInicialBD.InsereDadosMockados(db);
}



app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();