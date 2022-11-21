using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class SecsionNumberPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='__next']";
        public ILocator SecsionNumber => Page.Locator(Container)
            .Locator("//*[contains(@class, 'styledComponents__SectionNumberWrapper')]");
    }
}
