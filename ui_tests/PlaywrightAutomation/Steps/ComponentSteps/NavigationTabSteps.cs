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
    internal class NavigationTabSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public NavigationTabSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }
        
        [Then(@"User in on the '([^']*)' tab on '([^']*)' container")]
        public void ThenUserInOnTheTabOnContainer(string tabName, string container)
        {
            var tab = _page.Component<NavigationTabs>(tabName, new Properties { ParentSelector = WebContainer.GetLocator(container)});

            var tabDisplayedState = tab.IsVisibleAsync().GetAwaiter().GetResult();
            tabDisplayedState.Should().BeTrue();

            var tabActiveStatus = tab.IsActive;
            tabActiveStatus.Should().BeTrue();
        }

        [When(@"User clicks on '([^']*)' tab on '([^']*)' container")]
        public void WhenUserClicksOnTabOnContainer(string tabName, string container)
        {
            _page.Component<NavigationTabs>(tabName, new Properties { ParentSelector = WebContainer.GetLocator(container)})
                .ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }
    }
}
