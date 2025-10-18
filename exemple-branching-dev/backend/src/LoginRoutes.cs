namespace WebApp;

public static class LoginRoutes
{
    private static Obj GetUser(HttpContext context)
    {
        return Session.Get(context, "user");
    }

    public static void Start()
    {
        // POST: Logga in användare
        Server.App.MapPost("/api/login", (HttpContext context, JsonElement bodyJson) =>
        {
            var user = GetUser(context);
            var body = JSON.Parse(bodyJson.ToString());

            // Om en användare redan är inloggad
            if (user != null)
            {
                var already = new { error = "A user is already logged in." };
                return RestResult.Parse(context, already);
            }

            // Hitta användaren i databasen
            var dbUser = SQLQueryOne(
                "SELECT * FROM users WHERE email = $email",
                new { body.email }
            );
            if (dbUser == null)
            {
                return RestResult.Parse(context, new { error = "No such user." });
            }

            // Kolla lösenordet
            if (!Password.Verify(
                (string)body.password,
                (string)dbUser.password
            ))
            {
                return RestResult.Parse(context,
                    new { error = "Password mismatch." });
            }

            // Lägg till användaren i session (utan lösenord)
            dbUser.Delete("password");
            Session.Set(context, "user", dbUser);

            // Returnera användaren
            return RestResult.Parse(context, dbUser!);
        });

        // GET: Hämta inloggad användare
        Server.App.MapGet("/api/login", (HttpContext context) =>
        {
            var user = GetUser(context);
            return RestResult.Parse(context, user != null ?
                user : new { error = "No user is logged in." });
        });

        // DELETE: Logga ut användare
        Server.App.MapDelete("/api/login", (HttpContext context) =>
        {
            var user = GetUser(context);

            // Ta bort användaren från session
            Session.Set(context, "user", null);

            return RestResult.Parse(context, user == null ?
                new { error = "No user is logged in." } :
                new { status = "Successful logout." }
            );
        });
    }
}
