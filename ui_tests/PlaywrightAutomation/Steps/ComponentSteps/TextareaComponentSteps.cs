using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class TextareaComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public TextareaComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User set '([^']*)' text to '([^']*)' textarea on '([^']*)' container")]
        public void WhenUserSetTextToInputOnContainer(string text, string textarea, string container)
        {
            var parent = WebContainer.GetLocator(container);
            _page.Component<Textarea>(textarea, new Properties { ParentSelector = parent })
                .FillAsync(text).GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }
    }
}
