using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class ButtonComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public ButtonComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User clicks on '([^']*)' button")]
        public void WhenUserClicksOnButton(string buttonName)
        {
            _page.Component<Button>(buttonName).ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [When(@"User clicks '([^']*)' div button")]
        public void WhenUserClicksDivButton(string divButtonName)
        {
            _page.Component<DivButton>(divButtonName, new Properties { Parent = _page.Init<HomePage>().Container }).ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User clicks on 'Clear' search field button")]
        public void WhenUserClicksOnClearSearchFieldButton()
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            _page.Init<HomePage>().ClearSearchFieldButton.ClickAsync().GetAwaiter().GetResult();
        }
    }
}
