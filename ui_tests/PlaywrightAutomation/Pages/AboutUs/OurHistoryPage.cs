using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class OurHistoryPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='ourHistory']";
        public ILocator Title => Page.Locator(Container).Locator("//*[contains(@class,'section-title')]");
    }
}