using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class CareerPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__CareerMainBody')]";

        public ILocator NoResultsMessage => Page.Locator("//div[contains(@class,'styledComponents__NoCareerWrapper')]");
    }
}
