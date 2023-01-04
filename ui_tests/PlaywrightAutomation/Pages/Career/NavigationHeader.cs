using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class NavigationHeader : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__NavigationHeaderWrapper')]";

        public ILocator Logo => Page.Locator(Container).Locator("//img[contains(@src, 'logo')]");
    }
}
