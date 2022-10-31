using ChoETL;
using FluentAssertions;
using Microsoft.Playwright;
using NUnit.Framework.Constraints;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Utils;
using System;
using System.Diagnostics.CodeAnalysis;
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

        [When(@"User clicks on '(.*)' direction button in pagination panel")]
        public void WhenUserClicksOnNextPageButtonInPaginationPanel(string direction)
        {
            var navigationButton = _page.Component<Pagination>().ArrowButtonByDirection(direction).ElementHandleAsync()
                .GetAwaiter().GetResult();
            navigationButton.ClickAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' pagination button has '([^']*)' background color in pagination panel")]
        public void ThenPaginationButtonHasBackgroundColorInPaginationPanel(string buttonName, string backgroundColor)
        {
            var paginationButtons = _page.Component<Pagination>().PaginationButtons
                .ElementHandlesAsync().GetAwaiter().GetResult();
            var button =
                paginationButtons.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(buttonName));
            button.GetBackgroundColor().Should().Be(ColorsConvertor.Converter(backgroundColor));
        }

        // position can only be "next" or "previous"
        [Then(@"Pagination navigation button with '(.*)' direction is displayed")]
        public void ThenNextPageButtonIsOnPositionInPaginationPanel(string direction)
        {
            var navigationButton = _page.Component<Pagination>().ArrowButtonByDirection(direction).ElementHandleAsync()
                .GetAwaiter().GetResult();
            navigationButton.Should().NotBeNull();
        }
    }
}