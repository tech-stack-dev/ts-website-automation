using AutomationUtils.Utils;
using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class HomePageSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public HomePageSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [Then(@"'([^']*)' language is selected")]
        public async void ThenLanguageIsSelected(string language)
        {
            var page = _page.Init<HomePage>();
            Verify.AreEqual(language, await page.GetSelectedLanguage(),
                "Incorrect language is selected");
        }

        [When(@"User selects '([^']*)' language")]
        public  void WhenUserSelectsLanguage(string language)
        {
             _page.Init<HomePage>().SelectLanguage(language).Wait();
        }
    }
}
