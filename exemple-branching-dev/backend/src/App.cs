// App.cs

using System;

class Program
{
    static void Main(string[] args)
    {
        // Global settings
        Globals = Obj(new
        {
            debugOn = true,
            detailedAclDebug = false,
            aclOn = true,
            isSpa = true,
            port = args.Length > 0 ? args[0] : "5000", // standardport 5000
            serverName = "Minimal API Backend",
            frontendPath = args.Length > 1 ? args[1] : "../", // ändrad sökväg
            dbPath = args.Length > 2 ? args[2] : "database.sqlite",
            sessionLifeTimeHours = 2
        });

        Console.WriteLine($"Starting {Globals.serverName} on port {Globals.port}");
        Console.WriteLine($"Frontend path: {Globals.frontendPath}");
        Console.WriteLine($"Database path: {Globals.dbPath}");

        // Start the server
        Server.Start();
    }
}




