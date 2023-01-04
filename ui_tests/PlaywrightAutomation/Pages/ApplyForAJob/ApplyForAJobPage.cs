using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.ApplyForAJob
{
    internal class ApplyForAJobPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__ModalWrapper')]";

        public ILocator Title => Page.Locator(Container).Locator("//h1[contains(@class,'TitleCareerForm')]");
    }
}
