using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using p11transaction.Models;
using Steeltoe.Discovery.Client;

var builder = WebApplication.CreateBuilder(args);


//builder.WebHost.ConfigureKestrel(options =>
//{
//    options.ListenAnyIP(9114); // HTTP
//    options.ListenAnyIP(9115, listenOptions => listenOptions.UseHttps()); // HTTPS (Optional)
//});

// Add services to the container.
//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RenteaseContext>();
builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    option.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddCors(policybuilder => policybuilder.AddDefaultPolicy(policy =>
    policy.WithOrigins("*").AllowAnyHeader().AllowAnyHeader()));

//for microservice
builder.Services.AddDiscoveryClient(builder.Configuration);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middlewares
//app.UseHttpsRedirection();
app.UseCors("AllowAll");   
//app.UseStaticFiles();         // Enable serving static files
app.UseRouting();
// Maps API endpoints
//app.UseHttpsRedirection();
app.UseDiscoveryClient(); //Microservices

app.UseAuthorization();
app.MapControllers();
app.Run();
