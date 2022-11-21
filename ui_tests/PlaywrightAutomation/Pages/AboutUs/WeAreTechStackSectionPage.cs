using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class WeAreTechStackSectionPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='weAreTechstack']";
        public ILocator Title => Page.Locator(Container)
            .Locator("//div[@class='paragraph-title']");
        public ILocator Description => Page.Locator(Container)
            .Locator("//div[@class='paragraph-content']");

    }
}
