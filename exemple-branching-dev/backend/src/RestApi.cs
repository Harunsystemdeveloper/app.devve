namespace WebApp;

public static class RestApi
{
    public static void Start()
    {
        // POST: Lägg till ny post
        Server.App.MapPost("/api/{table}", (
            HttpContext context, string table, JsonElement bodyJson
        ) =>
        {
            var body = JSON.Parse(bodyJson.ToString());
            body.Delete("id");
            var parsed = ReqBodyParse(table, body);
            var columns = parsed.insertColumns;
            var values = parsed.insertValues;
            var sql = $"INSERT INTO {table}({columns}) VALUES({values})";
            var result = SQLQueryOne(sql, parsed.body, context);
            if (!result.HasKey("error"))
            {
                // Hämta senaste insatta ID
                result.insertId = SQLQueryOne(
                    @$"SELECT id AS __insertId 
                       FROM {table} ORDER BY id DESC LIMIT 1"
                ).__insertId;
            }
            return RestResult.Parse(context, result);
        });

        // GET: Hämta alla poster
        Server.App.MapGet("/api/{table}", (
            HttpContext context, string table
        ) =>
        {
            var sql = $"SELECT * FROM {table}";
            var query = RestQuery.Parse(context.Request.Query);
            sql += query.sql;
            return RestResult.Parse(context, SQLQuery(sql, query.parameters, context));
        });

        // GET: Hämta post med ID
        Server.App.MapGet("/api/{table}/{id}", (
            HttpContext context, string table, string id
        ) =>
            RestResult.Parse(context, SQLQueryOne(
                $"SELECT * FROM {table} WHERE id = $id",
                ReqBodyParse(table, Obj(new { id })).body,
                context
            ))
        );

        // PUT: Uppdatera post
        Server.App.MapPut("/api/{table}/{id}", (
            HttpContext context, string table, string id, JsonElement bodyJson
        ) =>
        {
            var body = JSON.Parse(bodyJson.ToString());
            body.id = id;
            var parsed = ReqBodyParse(table, body);
            var update = parsed.update;
            var sql = $"UPDATE {table} SET {update} WHERE id = $id";
            var result = SQLQueryOne(sql, parsed.body, context);
            return RestResult.Parse(context, result);
        });

        // DELETE: Ta bort post
        Server.App.MapDelete("/api/{table}/{id}", (
             HttpContext context, string table, string id
        ) =>
            RestResult.Parse(context, SQLQueryOne(
                $"DELETE FROM {table} WHERE id = $id",
                ReqBodyParse(table, Obj(new { id })).body,
                context
            ))
        );
    }
}
