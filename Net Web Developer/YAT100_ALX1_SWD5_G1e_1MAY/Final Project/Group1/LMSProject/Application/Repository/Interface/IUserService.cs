namespace LMSProject.Application.Repository.Interface
{
    public interface IUserService
    {
        Task<string> GenerateUniqueNumberAsync(string userType);
    }
}
