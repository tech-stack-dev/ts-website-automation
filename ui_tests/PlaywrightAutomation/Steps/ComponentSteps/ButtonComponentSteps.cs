using AutomationUtils.Utils;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.UnitTests;
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

        [When(@"User clicks on '([^']*)' button on '([^']*)' container")]
        public void WhenUserClicksOnButtonOnContainer(string button, string container)
        {
            _page.Component<Button>(button, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' button is displayed on '([^']*)' container")]
        public void ThenButtonIsDisplayedOnContainer(string buttonText, string container)
        {
            var isButtonVisible = _page.Component<Button>(buttonText, new Properties { ParentSelector = WebContainer.GetLocator(container) })
              .IsVisibleAsync().GetAwaiter().GetResult();

            isButtonVisible.Should().BeTrue();
        }
    }
}
