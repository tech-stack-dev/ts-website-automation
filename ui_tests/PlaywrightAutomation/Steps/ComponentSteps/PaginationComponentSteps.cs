using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class PaginationComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public PaginationComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User clicks on '(.*)' direction button in pagination panel")]
        public void WhenUserClicksOnNextPageButtonInPaginationPanel(string direction)
        {
            var navigationButton = _page.Component<Pagination>().ArrowButtonByDirection(direction);
            navigationButton.ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' pagination button has '([^']*)' background color in pagination panel")]
        public void ThenPaginationButtonHasBackgroundColorInPaginationPanel(string buttonName, string backgroundColor)
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons;
            var button = paginationButtons.GetByText(buttonName);

            button.GetBackgroundColor()
                .Should()
                .Be(ColorsConvertor.Converter(backgroundColor));
        }

        [Then(@"Pagination navigation button with '(.*)' direction is displayed")]
        public void ThenNextPageButtonIsOnPositionInPaginationPanel(string direction)
        {
            var pagination = _page.Component<Pagination>();
            pagination.HoverAsync().GetAwaiter().GetResult();
            var paginationDirectionVisibleState = pagination.ArrowButtonByDirection(direction).IsVisibleAsync().GetAwaiter().GetResult();
            paginationDirectionVisibleState.Should().BeTrue();
        }

        [Then(@"Pagination is displayed on Career page")]
        public void ThenPaginationIsDisplayedOnCareerPage()
        {
            _page.Component<Pagination>().PaginationButtons.First.WaitForAsync().GetAwaiter().GetResult();
        }
    }
}