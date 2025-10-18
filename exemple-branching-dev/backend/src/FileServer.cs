using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;

namespace WebApp;
public static class FileServer
{
    private static string FPath;

    // ✅ Ta emot WebApplication app som parameter
    public static void Start(WebApplication app)
    {
        // Convert frontendPath to an absolute path
        FPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            Globals.frontendPath
        );

        HandleStatusCodes(app);
        ServeFiles(app);
        ServeFileLists(app);
    }

    // --- Hantera statuskoder och 404 för SPA ---
    private static void HandleStatusCodes(WebApplication app)
    {
        app.UseStatusCodePages(async statusCodeContext =>
        {
            var context = statusCodeContext.HttpContext;
            var request = context.Request;
            var response = context.Response;
            var statusCode = response.StatusCode;
            var isInApi = request.Path.StartsWithSegments("/api");
            var isFilePath = (request.Path + "").Contains('.');
            var type = isInApi || statusCode != 404
                ? "application/json; charset=utf-8"
                : "text/html";
            var error = statusCode == 404
                ? "404. Not found."
                : "Status code: " + statusCode;

            response.ContentType = type;
            if (Globals.isSpa && !isInApi && !isFilePath && statusCode == 404)
            {
                response.StatusCode = 200;
                await response.WriteAsync(
                    File.ReadAllText(Path.Combine(FPath, "index.html"))
                );
            }
            else
            {
                await response.WriteAsJsonAsync(new { error });
            }
        });
    }

    // --- Servera statiska filer ---
    private static void ServeFiles(WebApplication app)
    {
        app.UseFileServer(new FileServerOptions
        {
            FileProvider = new PhysicalFileProvider(FPath)
        });
    }

    // --- Lista filer från frontend-mappar ---
    private static void ServeFileLists(WebApplication app)
    {
        app.MapGet("/api/files/{folder}", (HttpContext context, string folder) =>
        {
            object result = null;
            try
            {
                result = Arr(Directory.GetFiles(Path.Combine(FPath, folder)))
                    .Map(x => Arr(x.Split('/')).Pop())
                    .Filter(x => Acl.Allow(context, "GET", "/content/" + x));
            }
            catch (Exception) { }
            return RestResult.Parse(context, result);
        });
    }
}
