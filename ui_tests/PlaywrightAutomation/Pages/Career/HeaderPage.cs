using FluentAssertions;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class HeaderPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'_HeaderWrapper')]";

        public ILocator Logo => Page.Locator(Container).Locator("//img[contains(@src, 'logo')]");

        public void CheckLogo()
        {
            var logoVisibleState = Logo.IsVisibleAsync().GetAwaiter().GetResult();
            logoVisibleState.Should().BeTrue();
            var logoText = Logo.GetAttributeAsync("alt").GetAwaiter().GetResult();
            logoText.Should().Be("Techstack");
        }
    }
}