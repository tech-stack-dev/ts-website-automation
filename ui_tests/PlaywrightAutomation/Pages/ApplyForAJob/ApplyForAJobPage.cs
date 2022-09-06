using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.ApplyForAJob
{
    internal class ApplyForAJobPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__ModalWrapper')]";

        // Use only where input is parent
        public string ErrorMessage => "//following-sibling::div[@id='error']";
    }
}
