using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text.RegularExpressions;

namespace WebApp;
public static class Acl
{
    private static Arr rules;

    // ✅ tar emot WebApplication app nu
    public static async void Start(WebApplication app)
    {
        // Read rules from db once a minute
        while (true)
        {
            UnpackRules(SQLQuery("SELECT * FROM acl ORDER BY allow"));
            await Task.Delay(60000);
        }
    }

    public static void UnpackRules(Arr allRules)
    {
        // Unpack db response -> routes to regexps and userRoles to arrays
        rules = allRules.Map(x => new
        {
            ___ = x,
            regexPattern = @"^" + x.route.Replace("/", @"\/") + @"\/",
            userRoles = ((Arr)Arr(x.userRoles.Split(','))).Map(x => x.Trim())
        });
    }

    public static bool Allow(HttpContext context, string method = "", string path = "")
    {
        if (!Globals.aclOn) return true;

        method = method != "" ? method : context.Request.Method;
        path = path != "" ? path : context.Request.Path;

        var user = Session.Get(context, "user");
        var userRole = user == null ? "visitor" : user.role;
        var userEmail = user == null ? "" : user.email;

        var allowed = false;
        Obj appliedAllowRule = null;
        Obj appliedDisallowRule = null;

        foreach (var rule in rules)
        {
            var ruleMethod = rule.method;
            var ruleRegexPattern = rule.regexPattern;
            var ruleRoles = (Arr)rule.userRoles;
            var ruleMatch = rule.match == "true";
            var ruleAllow = rule.allow == "allow";

            var roleOk = ruleRoles.Includes(userRole);
            var methodOk = method == ruleMethod || ruleMethod == "*";
            var pathOk = Regex.IsMatch(path + "/", ruleRegexPattern);
            pathOk = ruleMatch ? pathOk : !pathOk;

            var allOk = roleOk && methodOk && pathOk;

            var oldAllowed = allowed;
            allowed = ruleAllow ? allowed || allOk : allOk ? false : allowed;

            if (oldAllowed != allowed)
            {
                if (ruleAllow) appliedAllowRule = rule;
                else appliedDisallowRule = rule;
            }
        }

        var toLog = Obj(new { userRole, userEmail, aclAllowed = allowed });
        if (Globals.detailedAclDebug && appliedAllowRule != null)
            toLog.aclAppliedAllowRule = appliedAllowRule;
        if (Globals.detailedAclDebug && appliedDisallowRule != null)
            toLog.aclAppliedDisallowRule = appliedDisallowRule;
        if (userEmail == "") toLog.Delete("userEmail");

        DebugLog.Add(context, toLog);
        return allowed;
    }
}
