using ChoETL;
using FluentAssertions;
using Microsoft.Playwright;
using NUnit.Framework.Constraints;
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

        [When(@"User clicks on next page button in pagination panel")]
        public void WhenUserClicksOnNextPageButtonInPaginationPanel()
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult();

            paginationButtons.Last().ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' pagination button has '([^']*)' background color in pagination panel")]
        public void ThenPaginationButtonHasBackgroundColorInPaginationPanel(string buttonName, string backgroundColor)
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult();

            var button = paginationButtons.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(buttonName));
            button.GetBackgroundColor().Should().Be(ColorsConvertor.Converter(backgroundColor));
        }

        // position can only be "first" or "last"
        [Then(@"Next page button is on '([^']*)' position in pagination panel")]
        public void ThenNextPageButtonIsOnPositionInPaginationPanel(string position)
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            if (!paginationButtons.Any())
            {
                throw new Exception("Pagination panel has not any buttons");
            }

            var nextPageButtons = _page.Component<Pagination>().NextPageButton
                .ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            var nextPageButtonInnerHTML = nextPageButtons[0].InnerHTMLAsync().GetAwaiter().GetResult();

            switch (position)
            {
                case "first":
                    var firstPaginationButton = paginationButtons.FirstOrDefault(x => x.InnerHTMLAsync()
                        .GetAwaiter().GetResult().Contains(nextPageButtonInnerHTML));
                    var actualFirstPaginationButtonPosition = paginationButtons.IndexOf(firstPaginationButton);
                    actualFirstPaginationButtonPosition.Should().Be(0);
                    break;

                case "last":
                    var lastPaginationButton = paginationButtons.LastOrDefault(x => x.InnerHTMLAsync()
                        .GetAwaiter().GetResult().Contains(nextPageButtonInnerHTML));
                    var actualLastPaginationButtonPosition = paginationButtons.LastIndexOf(lastPaginationButton);
                    actualLastPaginationButtonPosition.Should().Be(paginationButtons.Count - 1);
                    break;

                default:
                    throw new Exception("Pagination panel has not any buttons");
            }
        }
    }
}
