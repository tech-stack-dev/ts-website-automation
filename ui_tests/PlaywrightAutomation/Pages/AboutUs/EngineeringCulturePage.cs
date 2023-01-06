using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class EngineeringCulturePage : BasePage, IWebContainer
    {
        public string Container => "//div[@id ='engineeringCulture']";
        public ILocator BlockTitle => Page.Locator(Container).Locator("//div[@class='block-title']");
        public ILocator TextDescription => Page.Locator(Container).Locator("//div[@class='text-description']");
    }
}