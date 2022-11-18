using System.Linq;
using System.Threading.Tasks;
using AutomationUtils.Utils;
using FluentAssertions;
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

        public  void CheckLogo()
        {
            var logoVisibleState = Logo.IsVisibleAsync().GetAwaiter().GetResult();
            logoVisibleState.Should().BeTrue();
            var logoText = Logo.GetAttributeAsync("alt").GetAwaiter().GetResult();
            logoText.Should().Be("Techstack");
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