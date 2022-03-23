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
        private readonly GooglePage _pageGoogle;
        private readonly BrowserFactory _browserFactory;
        private IPage _page;

        public InitialSteps(GooglePage googlePage, BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
            _pageGoogle = googlePage;
            _browserFactory = browserFactory;
        }

        [Given(@"User on Google page")]
        public async void GivenUserOnGooglePage()
        {
            var page = _page.Init<WelcomePage>();
            page.CheckLogo();
            //await _pageGoogle.NavigateAsync();
            //await _pageGoogle.ClickSearchButton();
        }

        [Given(@"User is on the '([^']*)' page")]
        public async void GivenUserIsOnThePage(string url)
        {
            _page = _browserFactory.OpenNewPage(UrlProvider.Application).Result;
        }
    }
}
