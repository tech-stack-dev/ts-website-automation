using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components.Button;
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
            var languageButtons = _page.Component<Button>("Locale").AllAsync().GetAwaiter().GetResult().ToList();
            var neededButton =
                languageButtons.First(x => x.TextContentAsync().GetAwaiter().GetResult().Equals(language));
            neededButton.ClickAsync().GetAwaiter().GetResult();
        }

        [Then(@"Techstack logo is displayed on main page")]
        public void ThenTechstackLogoIsDisplayedOnMainPage()
        {
            _page.Init<HeaderPage>().CheckLogo();
        }

        [Then(@"'([^']*)' language is selected '([^']*)' on container")]
        public void ThenLanguageIsSelected(string language, string container)
        {
            // Playwright works pretty much faster than DOM is updating on TSWebSite at this current place.
            Task.Delay(1000).GetAwaiter().GetResult();
            var languageButtons = _page.Component<Button>("Locale").AllAsync().GetAwaiter().GetResult().ToList();
            var neededButton =
                languageButtons.First(x => x.TextContentAsync().GetAwaiter().GetResult().Equals(language));
            var selectedLanguage = neededButton.GetAttributeAsync("class").GetAwaiter().GetResult();
            selectedLanguage.Should().Contain("active-locale");
        }
    }
}