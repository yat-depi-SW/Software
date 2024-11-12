using Microsoft.AspNetCore.Mvc.Rendering;

namespace LMSProjectAUTH.Application.Repository.Interface
{
    public interface IMemberService
    {
    public    List<SelectListItem> GetMembersForDropdown();

    }
}
