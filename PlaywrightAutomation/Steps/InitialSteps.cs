using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
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
            _browserFactory = browserFactory;
            _page = browserFactory.Page;
        }

        [Given(@"User on Google page")]
        public async void GivenUserOnGooglePage()
        {
            var page = _page.Init<HomePage>();
            page.CheckLogo();
        }
    }
}
