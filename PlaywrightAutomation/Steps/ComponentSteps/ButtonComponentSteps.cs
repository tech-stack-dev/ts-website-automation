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
        public void WhenUserClicksOnButton(string button)
        {
            _page.Component<Button>(button, new Properties { Parent = _page.Init<HomePage>().Container })
                .ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }
    }
}
