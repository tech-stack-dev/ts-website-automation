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
        
        [Then(@"User in on the '([^']*)' block")]
        public void ThenUserInOnTheBlock(string blockName)
        {
            var tab = _page.Component<NavigationTabs>(blockName);

            var tabDisplayedState = tab.IsVisibleAsync().GetAwaiter().GetResult();
            tabDisplayedState.Should().BeTrue();

            var tabActiveStatus = tab.IsActive;
            tabActiveStatus.Should().BeTrue();
        }
    }
}
