using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class TechstackRolesPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='techstackRoles']";
        public ILocator ParagraphDescription => Page.Locator(Container).Locator("//div[@class='paragraph-description']");
        public ILocator BlockTitle => Page.Locator(Container).Locator("//*[contains(@class,'block-title')]");
        public ILocator TextDescription => Page.Locator(Container).Locator("//*[contains(@class,'text-description')]");
    }
}