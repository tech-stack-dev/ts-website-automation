using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class InputComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public InputComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User clears input on '([^']*)' container")]
        public void WhenUserClearsInputOnContainer(string container)
        {
            _page.Component<Input>(new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .CleanInputButton.ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [When(@"User set '([^']*)' text to '([^']*)' input on '([^']*)' container")]
        public void WhenUserSetTextToInputOnContainer(string text, string input, string container)
        {
            var parent = WebContainer.GetLocator(container);
            _page.Component<Input>(input, new Properties { ParentSelector = parent })
                .FillAsync(text).GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' text is displayed in '([^']*)' input on '([^']*)' container")]
        public void ThenTextIsDisplayedInInputOnContainer(string text, string input, string container)
        {
            var inputElementText =
                _page.Component<Input>(input, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .TextContentAsync().GetAwaiter().GetResult();

            inputElementText.Should().Be(text);
        }
    }
}