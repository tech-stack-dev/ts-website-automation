using AutomationUtils.Utils;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class HeaderPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'_HeaderWrapper')]";

        public ILocator Logo => Page.Locator(Container).Locator("//img[contains(@src, 'logo')]");

        public async void CheckLogo()
        {
            Verify.IsTrue(await Logo.IsVisibleAsync(), "Header logo is not displayed");
            Verify.AreEqual("Techstack", await Logo.GetAttributeAsync("alt"),
                "Header logo is not displayed");
        }
    }
}