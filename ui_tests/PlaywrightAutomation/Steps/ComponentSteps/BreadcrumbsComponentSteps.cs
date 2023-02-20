using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class BreadcrumbsComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly SessionRandomValue _sessionRandom;

        public BreadcrumbsComponentSteps(BrowserFactory browserFactory, SessionRandomValue sessionRandom)
        {
            _page = browserFactory.Page;
            _sessionRandom = sessionRandom;
        }

        [Then(@"Breadcrumbs has '([^']*)' text")]
        public void ThenBreadcrumbsHasText(string expectedBreadcrumbs)
        {
            _page.ExecuteFunc(() =>
            {
                _page.ReloadAsync().GetAwaiter().GetResult();
                var tabPart = _page.Component<Breadcrumbs>().SharedJobsPart.TextContentAsync().GetAwaiter().GetResult();
                var jobTitlePart = _page.Component<Breadcrumbs>().JobTitlePart.TextContentAsync().GetAwaiter()
                    .GetResult();
                var actualBreadcrumbs = string.Concat(tabPart, jobTitlePart);

                actualBreadcrumbs.Should().Be(expectedBreadcrumbs.AddRandom(_sessionRandom));
            }, PageExtensions.AmountOfTime.Medium);
        }
    }
}