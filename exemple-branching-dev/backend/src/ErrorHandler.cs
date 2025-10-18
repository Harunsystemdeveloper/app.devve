using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace WebApp;
public static class ErrorHandler
{
    // ✅ Ta emot WebApplication app
    public static void Start(WebApplication app)
    {
        app.UseExceptionHandler(exceptionApp =>
        {
            exceptionApp.Run(async context =>
            {
                var feature = context.Features.Get<IExceptionHandlerPathFeature>();
                DebugLog.Add(context, new { error = feature?.Error.Message });
                var error = new { error = feature?.Error.Message ?? "Ett oväntat fel uppstod" };
                context.Response.Headers.Append("Server", (string)Globals.serverName);
                await context.Response.WriteAsJsonAsync(error);
            });
        });
    }
}
