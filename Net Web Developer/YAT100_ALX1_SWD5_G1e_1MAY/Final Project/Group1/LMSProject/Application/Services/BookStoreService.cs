using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models.Models;
namespace LMSProjectAUTH.Application.Services
{
    public class BookStoreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;


        public BookStoreService(IUnitOfWork unitOfWork, IMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        public async Task<bool> EditBookStoreAsync(int printSerialId)
        {
            var bookStoreDb = await _unitOfWork.BookStore.GetByIdAsync(printSerialId);

            if (bookStoreDb == null)
                return false;

            bookStoreDb.IsAvaliable = false;

            await _unitOfWork.BookStore.UpdateAsync(bookStoreDb);

            await _unitOfWork.SaveAsync();

            return true;
        }
    }
}
