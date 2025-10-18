namespace WebApp;

public static class Globals
{
    public static int port = 5000;
    public static string dbPath = "_db.sqlite3";
    public static string frontendPath = "../";
    public static string serverName = "Ajeey Dev Backend";
    public static bool aclOn = true;
    public static bool detailedAclDebug = false;
    public static bool isSpa = true;
    public static bool debugOn = true;
    public static int sessionLifeTimeHours = 12;

    // Returnerar aktuell tid i loggar
    public static string Now()
    {
        return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
    }
}

