using AutomationUtils.Utils;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.UnitTests;
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
            _page.Component<Button>("Locale", new BaseWebComponent.Properties { ParentSelector = WebContainer.GetLocator(container)}).SelectLanguage(language).GetAwaiter().GetResult();
        }
        
        [Then(@"'Techstack' logo is displayed in the main page")]
        public void ThechstackLogoIsDisplayedInTheMainPage()
        {
            _page.Init<HeaderPage>().CheckLogo();
        }

        [Then(@"'([^']*)' language is selected '([^']*)' on container")]
        public async void ThenLanguageIsSelected(string language, string container)
        {
            var page = _page.Component<Button>("Locale",
                new BaseWebComponent.Properties {ParentSelector = WebContainer.GetLocator(container)}).GetSelectedLanguage().GetAwaiter().GetResult();
            page.Should().Be(language);
        }
    }
}
