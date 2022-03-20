using AutomationUtils.Utils;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class WelcomePage : BasePage
    {
        public ILocator Logo => Page.Locator("//div[contains(@class,'_HeaderWrapper')]//img[contains(@src, 'logo')]");

        public void CheckLogo()
        {
            Verify.IsTrue(Logo.IsDisabledAsync().Result, "Header logo is not displayed");
            Verify.AreEqual("Techstack", Logo.GetAttributeAsync("alt").Result, 
                "Header logo is not displayed");
        }
    }
}
