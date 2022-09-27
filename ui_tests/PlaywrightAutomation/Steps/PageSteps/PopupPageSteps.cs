using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.PageSteps
{
    [Binding]
    internal class PopupPageSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public PopupPageSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [Then(@"'([^']*)' website is opened in popup window")]
        public void ThenWebsiteIsOpenedInPopupWindow(string website)
        {
            var popup = _page.WaitForPopupAsync().GetAwaiter().GetResult();
            popup.Url.Should().Contain(website.ToLower());
        }
    }
}
