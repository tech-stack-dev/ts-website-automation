using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class SectionNumberPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='__next']";
        public ILocator SectionNumber => Page.Locator(Container)
            .Locator("//*[contains(@class, 'styledComponents__SectionNumberWrapper')]");
    }
}