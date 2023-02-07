using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.PageSteps
{
    [Binding]
    internal class HeaderPageSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public HeaderPageSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User selects '([^']*)' language on '([^']*)' container")]
        public void WhenUserSelectsLanguage(string language, string container)
        {
            _page.Init<HeaderPage>().SelectLanguage(language, container).GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.Load);
        }

        [Then(@"Techstack logo is displayed on main page")]
        public void ThenTechstackLogoIsDisplayedOnMainPage()
        {
            _page.Init<HeaderPage>().CheckLogo();
        }

        [Then(@"'([^']*)' language is selected '([^']*)' on container")]
        public void ThenLanguageIsSelected(string language, string container)
        {
            _page.ReloadAsync().GetAwaiter().GetResult();
            var selectedLanguage = _page.Init<HeaderPage>().GetSelectedLanguage(container).GetAwaiter().GetResult();
            selectedLanguage.Should().BeEquivalentTo(language);
        }
    }
}
