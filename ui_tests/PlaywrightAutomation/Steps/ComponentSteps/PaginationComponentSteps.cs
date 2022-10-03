using ChoETL;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
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

        [Then(@"Pagination is displayed on Career page")]
        public void ThenPaginationIsDisplayedOnCareerPage()
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult();
            paginationButtons.Should().NotBeNull();
        }

        [When(@"User clicks on next page button on pagination panel")]
        public void WhenUserClicksOnNextPageButtonOnPaginationPanel()
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult();

            paginationButtons.Last().ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' pagination button has '([^']*)' background color on pagination panel")]
        public void ThenPaginationButtonHasBackgroundColorOnPaginationPanel(string buttonName, string backgroundColor)
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult();

            var button = paginationButtons.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(buttonName));
            button.GetBackgroundColor().Should().Be(ColorsConvertor.Converter(backgroundColor));
        }

        [Then(@"Next page button is on first position on pagination panel")]
        public void ThenNextPageButtonIsOnFirstPositionOnPaginationPanel()
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            if (!paginationButtons.Any())
            {
                throw new Exception("Pagination panel has not any buttons");
            }

            var nextPageButtons = _page.Component<Pagination>().NextPageButton
                .ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            var nextPageButtonInnerHTM = nextPageButtons[0].InnerHTMLAsync().GetAwaiter().GetResult();

            var paginationButton = paginationButtons.FirstOrDefault(x => x.InnerHTMLAsync()
                .GetAwaiter().GetResult().Contains(nextPageButtonInnerHTM));

            var actualPosition = paginationButtons.IndexOf(paginationButton);
            actualPosition.Should().Be(0);
        }

        [Then(@"Next page button is on last position on pagination panel")]
        public void ThenNextPageButtonIsOnLastPositionOnPaginationPanel()
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            if (!paginationButtons.Any())
            {
                throw new Exception("Pagination panel has not any buttons");
            }

            var nextPageButtons = _page.Component<Pagination>().NextPageButton
               .ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            var nextPageButtonInnerHTM = nextPageButtons[0].InnerHTMLAsync().GetAwaiter().GetResult();

            var paginationButton = paginationButtons.LastOrDefault(x => x.InnerHTMLAsync()
                .GetAwaiter().GetResult().Contains(nextPageButtonInnerHTM));

            var actualPosition = paginationButtons.LastIndexOf(paginationButton);
            actualPosition.Should().Be(paginationButtons.Count - 1);
        }
    }
}
