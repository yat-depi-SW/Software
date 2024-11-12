using LMSProject.Data.Models.Models;

namespace LMSProjectAUTH.Application.Repository.Interface
{
    public interface IPenaltyRepository
    {
        Task<Borrow?> GetBorrowRecordAsync(int borrowId);
        Task<Penalitie?> GetOrCreatePenaltyRecordAsync(int borrowId, int penaltyDays, float penaltyValue);
    }
}