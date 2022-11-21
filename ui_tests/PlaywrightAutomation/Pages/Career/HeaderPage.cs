using System.Linq;
using System.Threading.Tasks;
using AutomationUtils.Utils;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.Button;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;

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

        public async Task SelectLanguage(string language, string container)
        {
            var switcher = (await Page.Component<Button>("Locale", new BaseWebComponent.Properties { ParentSelector = WebContainer.GetLocator(container)}).ElementHandlesAsync())
                .First(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(language));
            await switcher.ClickAsync();

            await Page
                .WaitForFunctionAsync("switcher => switcher.getAttribute('class').includes('active-locale')", switcher);
        }

        public async Task<string> GetSelectedLanguage(string container)
        {
            var selectedSwitcher = (await Page.Component<Button>("Locale", new BaseWebComponent.Properties { ParentSelector = WebContainer.GetLocator(container) }).ElementHandlesAsync())
                .First(x => x.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-locale"));
            return await selectedSwitcher.InnerTextAsync();
        }
    }
}