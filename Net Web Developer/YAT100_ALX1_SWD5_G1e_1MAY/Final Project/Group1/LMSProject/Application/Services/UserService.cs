using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LMSProject.Application.Services
{
    public class UserService : IUserService
    {
        private readonly AppDBContext _dbContext;

        public UserService(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GenerateUniqueNumberAsync(string userType)
        {
            string prefix;
            Func<Task<string>> getLastNumberFunc;

            // Assign the appropriate prefix and function to retrieve the last user's number
            switch (userType)
            {
                case "Librarian":
                    prefix = "LIB";
                    getLastNumberFunc = async () =>
                    {
                        var lastLibrarian = await _dbContext.Librarians
                            .OrderByDescending(l => l.LibrarianNo)
                            .FirstOrDefaultAsync();
                        return lastLibrarian?.LibrarianNo;
                    };
                    break;

                case "Member":
                    prefix = "MEM";
                    getLastNumberFunc = async () =>
                    {
                        var lastMember = await _dbContext.Members
                            .OrderByDescending(m => m.MemberNo)
                            .FirstOrDefaultAsync();
                        return lastMember?.MemberNo;
                    };
                    break;

                default:
                    throw new ArgumentException("Invalid user type provided.");
            }

            // Generate the next unique number
            return await GenerateNextUniqueNumberAsync(prefix, getLastNumberFunc);
        }

        // Helper method to generate the next unique number
        private async Task<string> GenerateNextUniqueNumberAsync(string prefix, Func<Task<string>> getLastNumberFunc)
        {
            var lastNumber = await getLastNumberFunc();

            if (lastNumber == null)
            {
                return $"{prefix}00001";  // Start with the initial number if no user exists
            }

            // Extract the numeric part from the last number and increment it
            string lastNumericPart = lastNumber.Substring(prefix.Length);
            int nextNumber = int.Parse(lastNumericPart) + 1;

            // Return the next unique number in the format "PREFIX00001"
            return $"{prefix}{nextNumber.ToString("D5")}";
        }
    }
}
