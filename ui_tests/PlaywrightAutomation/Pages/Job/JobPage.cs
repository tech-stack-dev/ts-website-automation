using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Pages
{
    internal class JobPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'DescriptionWrapper')]";

        public ILocator Tags => Page.Locator("//div[@data-id='CardTag-Title']");
        public ILocator Title => Page.Locator("//div[@class='career-title']");

        // To check that social media icons are under the job's title
        public ILocator SocialIcons => Title.Locator("//following-sibling::div//div[@class='social-icons-wrapper']");
        public ILocator SocialIconsText => SocialIcons.Locator("//p[@class='social-icons-share']");

        public ILocator BlockTitles => Page.Locator("//div[@class='block-title']");
        public ILocator ApplyContainer => Page.Locator("//div[contains(@class,'ApplyPropositionWrapper')]");

        public async void CheckLogo()
        {
            var logoState = (await Page.Init<NavigationHeader>().Logo.IsVisibleAsync());
            logoState.Should().BeTrue();

            var logoAttribute = (await Page.Init<NavigationHeader>().Logo.GetAttributeAsync("alt"));
            logoAttribute.Should().BeEquivalentTo("Techstack");
        }
    }
}
