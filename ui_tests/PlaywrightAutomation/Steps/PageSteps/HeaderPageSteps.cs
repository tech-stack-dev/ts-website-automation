using AutomationUtils.Utils;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
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
        }

        [Then(@"'Techstack' logo is displayed in the main page")]
        public void ThechstackLogoIsDisplayedInTheMainPage()
        {
            _page.Init<HeaderPage>().CheckLogo();
        }

        [Then(@"'([^']*)' language is selected '([^']*)' on container")]
        public void ThenLanguageIsSelected(string language, string container)
        {
            var page = _page.Init<HeaderPage>().GetSelectedLanguage(container).GetAwaiter().GetResult();
            page.Should().Be(language);
        }

        [Then(@"The page has '([^']*)' language switcher")]
        public void ThenThePageHasLanguageSwitcher(string language)
        {
            var page = _page.Init<HeaderPage>();
            var switchers = page.LanguageSwitchers.ElementHandlesAsync().GetAwaiter().GetResult();

            if (!switchers.Any())
            {
                throw new Exception("The page has not any language switchers");
            }

            var switcher = switchers.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(language));
            Verify.IsTrue(switcher != null, $"The page has not '{language}' switcher");
        }
    }
}
