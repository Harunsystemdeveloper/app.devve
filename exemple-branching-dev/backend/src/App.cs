namespace WebApp;

public static class App
{
    public static void Main(string[] args)
    {
        // Om du vill tillåta argument (port, databas etc.)
        if (args.Length > 0)
            Globals.port = int.Parse(args[0]);
        if (args.Length > 1)
            Globals.frontendPath = args[1];
        if (args.Length > 2)
            Globals.dbPath = args[2];

        Console.WriteLine($"Starting {Globals.serverName} on port {Globals.port}");
        Console.WriteLine($"Frontend path: {Globals.frontendPath}");
        Console.WriteLine($"Database path: {Globals.dbPath}");

        // Starta servern
        Server.Start();
    }
}





