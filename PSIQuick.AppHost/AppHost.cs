IDistributedApplicationBuilder builder = DistributedApplication.CreateBuilder(args);

IResourceBuilder<ProjectResource> apiService = builder.AddProject<Projects.PSIQuick_API>("API");
IResourceBuilder<NodeAppResource> webApp = builder.AddViteApp("WebApp", "../PSIQuick.WebApp")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithNpmPackageInstallation()
    .WithEnvironment("VITE_API_URL", apiService.GetEndpoint("http"));

apiService.WithEnvironment("CORS_ALLOWED_ORIGINS", webApp.GetEndpoint("http"));

builder.Build().Run();
