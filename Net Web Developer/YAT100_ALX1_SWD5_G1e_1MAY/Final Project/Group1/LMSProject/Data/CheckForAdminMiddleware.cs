using LMSProject.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Data
{
    public class CheckForAdminMiddleware
    {
        private readonly RequestDelegate _next;

        public CheckForAdminMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, UserManager<ApplicationUser> userManager)
        {
            var users = await userManager.Users.AnyAsync();
            if (!users && !context.Request.Path.StartsWithSegments("/Account/RegisterAdmin"))
            {
                context.Response.Redirect("/Account/RegisterAdmin");
                return;
            }

            await _next(context);
        }
    }
}
