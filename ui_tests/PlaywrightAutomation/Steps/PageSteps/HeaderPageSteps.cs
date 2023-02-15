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

        [Then(@"Techstack logo is displayed on main page")]
        public void ThenTechstackLogoIsDisplayedOnMainPage()
        {
            _page.Init<HeaderPage>().CheckLogo();
        }
    }
}