using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.ApplyForAJob
{
    internal class ApplyForAJobPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__ModalWrapper')]";

        // Use only where input is parent
        public ILocator ErrorMessage => Page.Locator("//following-sibling::div[@id='error']");
    }
}
