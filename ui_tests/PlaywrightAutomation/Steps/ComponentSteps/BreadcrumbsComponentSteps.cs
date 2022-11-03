using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class BreadcrumbsComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public BreadcrumbsComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [Then(@"Breadcrumbs has '([^']*)' text")]
        public void ThenBreadcrumbsHasText(string expectedBreadcrumbs)
        {
            var tabPart = _page.Component<Breadcrumbs>().SharedJobsPart.TextContentAsync().GetAwaiter().GetResult();
            var jobTitlePart = _page.Component<Breadcrumbs>().JobTitlePart.TextContentAsync().GetAwaiter().GetResult();
            var actualBreadcrumbs = string.Concat(tabPart, jobTitlePart);

            actualBreadcrumbs.Should().Be(expectedBreadcrumbs);
        }
    }
}
