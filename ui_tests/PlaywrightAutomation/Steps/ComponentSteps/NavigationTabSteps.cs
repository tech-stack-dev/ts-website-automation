using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

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
        
        [Then(@"User in on the '([^']*)' tab in '([^']*)' container")]
        public void ThenUserInOnTheBlockInContainer(string tabName, string container)
        {
            var tab = _page.Component<NavigationTabs>(tabName,new BaseWebComponent.Properties {ParentSelector = WebContainer.GetLocator(container)});

            var tabDisplayedState = tab.IsVisibleAsync().GetAwaiter().GetResult();
            tabDisplayedState.Should().BeTrue();

            var tabActiveStatus = tab.IsActive;
            tabActiveStatus.Should().BeTrue();
        }

        [When(@"User clicks on '([^']*)' tab")]
        public void WhenUserClicksOnTab(string tabName)
        {
            _page.Component<NavigationTabs>(tabName).ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }
    }
}
