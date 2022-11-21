using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class AboutUsPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class, 'styledComponents__AboutUsWrapper')]";

        public string Title => "//div[@class='paragraph-title']";

        public string Description => "//div[@class='paragraph-content']";
    }
}
