using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class InitialSteps : SpecFlowContext
    {
        private readonly BrowserFactory _browserFactory;
        private IPage _page;

        public InitialSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
            _browserFactory = browserFactory;
        }

        [Given(@"User on Google page")]
        public async void GivenUserOnGooglePage()
        {
            var page = _page.Init<WelcomePage>();
            page.CheckLogo();
        }

        [Given(@"User is on the '([^']*)' page")]
        public async void GivenUserIsOnThePage(string url)
        {
            _page = _browserFactory.OpenNewPage(UrlProvider.Application).Result;
        }
    }
}
