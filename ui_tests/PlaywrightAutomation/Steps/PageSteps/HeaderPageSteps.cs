using AutomationUtils.Utils;
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
        
        [When(@"User selects '([^']*)' language")]
        public void WhenUserSelectsLanguage(string language)
        {
            _page.Init<HeaderPage>().SelectLanguage(language).GetAwaiter().GetResult();
        }
        
        [Then(@"'Techstack' logo is displayed in the main page")]
        public void ThechstackLogoIsDisplayedInTheMainPage()
        {
            _page.Init<HeaderPage>().CheckLogo();
        }

        [Then(@"'([^']*)' language is selected")]
        public async void ThenLanguageIsSelected(string language)
        {
            var page = _page.Init<HeaderPage>();
            Verify.AreEqual(language, await page.GetSelectedLanguage(),
                "Incorrect language is selected");
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
