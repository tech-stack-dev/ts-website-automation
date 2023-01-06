using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class TechstackInGrowthPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='techstackInGrows']";
        public ILocator Description => Page.Locator(Container)
            .Locator("//div[@class='paragraph-content']");
        public ILocator TopBlockTitle => Page.Locator(Container)
            .Locator("//div[@class='TopRectangle-sc-1ey8jnb-0 jVsckt']");
        public ILocator MainBlockTitles => Page.Locator(Container)
            .Locator("//*[@class='Rectangle-sc-kppxor-0 dzNASl']");
    }
}