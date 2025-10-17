using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace WebApp;
public static class Server
{
    public static WebApplication App { get; private set; }

    public static void Start()
    {
        var builder = WebApplication.CreateBuilder();

        // -------------------
        // Lägg till CORS
        // -------------------
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins("http://localhost:5173") // frontend URL
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        // -------------------
        // Bygg App innan allt annat
        // -------------------
        App = builder.Build();

        // Aktivera CORS
        App.UseCors();

        // -------------------
        // Middleware & serverlogik
        // -------------------
        Middleware();
        DebugLog.Start();
        Acl.Start();          // App måste finnas
        ErrorHandler.Start(); // App måste finnas
        FileServer.Start();
        LoginRoutes.Start();
        RestApi.Start();
        Session.Start();

        // Starta server
        var runUrl = "http://localhost:" + Globals.port;
        Log("Server running on:", runUrl);
        Log("With these settings:", Globals);

        App.Run(runUrl);
    }

    public static void Middleware()
    {
        App.Use(async (context, next) =>
        {
            context.Response.Headers.Append("Server", (string)Globals.serverName);
            DebugLog.Register(context);
            Session.Touch(context);

            if (!Acl.Allow(context))
            {
                context.Response.StatusCode = 405;
                var error = new { error = "Not allowed." };
                DebugLog.Add(context, error);
                await context.Response.WriteAsJsonAsync(error);
            }
            else
            {
                await next(context);
            }

            var res = context.Response;
            var contentLength = res.ContentLength ?? 0;
            var info = Obj(new
            {
                statusCode = res.StatusCode,
                contentType = res.ContentType,
                contentLengthKB = Math.Round((double)contentLength / 10.24) / 100,
                RESPONSE_DONE = Now
            });

            if (info.contentLengthKB == null || info.contentLengthKB == 0)
            {
                info.Delete("contentLengthKB");
            }

            DebugLog.Add(context, info);
        });
    }

    private static void Log(string message, object? data = null)
    {
        Console.WriteLine(message);
        if (data != null)
        {
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(data, new System.Text.Json.JsonSerializerOptions { WriteIndented = true }));
        }
    }
}

