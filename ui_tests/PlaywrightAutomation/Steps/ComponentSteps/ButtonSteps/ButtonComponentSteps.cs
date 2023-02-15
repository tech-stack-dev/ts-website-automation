using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components.Button;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
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

        [When(@"User clicks on '([^']*)' button on '([^']*)' container")]
        public void WhenUserClicksOnButtonOnContainer(string button, string container)
        {
            _page.Component<Button>(button, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [When(@"User clicks on '([^']*)' button with '([^']*)' text on '([^']*)' container")]
        public void WhenUserClicksOnButtonWithTextOnContainer(string button, string buttonText, string container)
        {
            _page.Component<Button>(button, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .GetByText(buttonText).ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' button is displayed on '([^']*)' container")]
        public void ThenButtonIsDisplayedOnContainer(string buttonText, string container)
        {
            var buttonVisibleState = _page.Component<Button>(buttonText, new Properties { ParentSelector = WebContainer.GetLocator(container) })
              .IsVisibleAsync().GetAwaiter().GetResult();

            buttonVisibleState.Should().BeTrue();
        }

        [Then(@"'([^']*)' button with '([^']*)' text is displayed on '([^']*)' container")]
        public void ThenButtonWithTextIsDisplayedOnContainer(string button, string buttonText, string container)
        {
            var buttonTextState = _page.Component<Button>(button, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .InnerTextAsync().GetAwaiter().GetResult().Equals(buttonText);

            buttonTextState.Should().BeTrue();
        }

        [Then(@"'([^']*)' button with '([^']*)' text is active on '([^']*)' container")]
        public void ThenButtonWithTextIsActiveOnContainer(string button, string buttonText, string container)
        {
            // Playwright works pretty much faster than DOM is updating on TSWebSite at this current place.
            Task.Delay(1000).GetAwaiter().GetResult();
            var buttons = _page.Component<Button>(button, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .AllAsync().GetAwaiter().GetResult().ToList();

            var neededButton =
                buttons.First(x => x.TextContentAsync().GetAwaiter().GetResult().Equals(buttonText));
            var selectedLanguage = neededButton.GetAttributeAsync("class").GetAwaiter().GetResult();
            selectedLanguage.Should().Contain("active");
        }
    }
}
