using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Borrow;

namespace LMSProjectAUTH.Application.Services
{
    public class BorrowService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;

        public BorrowService(IUnitOfWork unitOfWork, IMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        public async Task AddBorrowAsync(AddBorrowVM addBorrowVM)
        {
            var borrow = _autoMapper.Map<Borrow>(addBorrowVM);
            await _unitOfWork.Borrow.AddAsync(borrow);
            await _unitOfWork.SaveAsync();
        }
    }
}
