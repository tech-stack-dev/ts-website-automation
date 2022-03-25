using Microsoft.Playwright;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class GeneralSteps : SpecFlowContext
    {
        private readonly BrowserFactory _browserFactory;
        private IPage _page;

        public GeneralSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
            _browserFactory = browserFactory;
        }

        [Given(@"User is on the career website")]
        public void GivenUserIsOnTheCareerWebsite()
        {
            _page = _browserFactory.OpenNewPage(UrlProvider.Application).Result;
        }

        [Given(@"User is on the '([^']*)' page")]
        public async void GivenUserIsOnThePage(string url)
        {
            _page = _browserFactory.OpenNewPage(url).Result;
        }
    }
}
