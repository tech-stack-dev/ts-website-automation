using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components.Button;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
using System.Threading.Tasks;
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

        [When(@"User clicks '([^']*)' button on '([^']*)' container")]
        public void WhenUserClicksButtonOnContainer(string button, string container)
        {
            var buttonElement = _page.Component<Button>(button,
                new Properties { ParentSelector = WebContainer.GetLocator(container) });
            buttonElement.WaitForAsync().GetAwaiter().GetResult();
            buttonElement.ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' button is displayed on '([^']*)' container")]
        public void ThenButtonIsDisplayedOnContainer(string buttonText, string container)
        {
            var buttonVisibleState = _page.Component<Button>(buttonText,
                    new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .IsVisibleAsync().GetAwaiter().GetResult();

            buttonVisibleState.Should().BeTrue();
        }

        [Then(@"'([^']*)' button with '([^']*)' text is displayed on '([^']*)' container")]
        public void ThenButtonWithTextIsDisplayedOnContainer(string button, string buttonText, string container)
        {
            var buttonTextState = _page.Component<Button>(button,
                    new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .InnerTextAsync().GetAwaiter().GetResult().Equals(buttonText);

            buttonTextState.Should().BeTrue();
        }

        [Then(@"'([^']*)' button is active on '([^']*)' container")]
        public void ThenButtonIsActiveOnContainer(string button, string container)
        {
            _page.ExecuteFunc(() =>
            {
                _page.ReloadAsync().GetAwaiter().GetResult();
                var buttonComponent = _page.Component<Button>(button,
                    new Properties { ParentSelector = WebContainer.GetLocator(container) });
                buttonComponent.GetAttributeAsync("class").GetAwaiter().GetResult().Should().Contain("active");
            }, PageExtensions.AmountOfTime.Medium);
        }
    }
}