using Microsoft.Playwright;
using PlaywrightAutomation.Components.Button;
using PlaywrightAutomation.Utils;
using static PlaywrightAutomation.Components.BaseWebComponent;
using TechTalk.SpecFlow;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Steps.ComponentSteps.ButtonSteps
{
    [Binding]
    internal class WrappedButtonComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public WrappedButtonComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User clicks on '([^']*)' wrapped button on '([^']*)' container")]
        public void WhenUserClicksOnWrappedButtonOnContainer(string button, string container)
        {
            _page.Component<WrappedButton>(button, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .ClickAsync().GetAwaiter().GetResult();
        }
    }
}
