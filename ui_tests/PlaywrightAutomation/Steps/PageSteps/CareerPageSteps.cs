using System.Linq;
using AutomationUtils.Utils;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.PageSteps
{
    [Binding]
    internal class CareerPageSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly VacancyList _position;

        public CareerPageSteps(BrowserFactory browserFactory, VacancyList position)
        {
            _page = browserFactory.Page;
            _position = position;
        }
        
        [When(@"User remembers vacancy names from Job page")]
        public void WhenUserRemembersVacancyNamesFromJobPage()
        {
            _position.Value = _page.Component<Card>().Title.AllTextContentsAsync().GetAwaiter().GetResult()
                .ToList();
        }

        [Then(@"Search results contain '([^']*)'")]
        public void ThenSearchResultsContain(string text)
        {
            var texts = _page.Component<Card>().Title.AllTextContentsAsync().GetAwaiter().GetResult();

            foreach (var roleText in texts)
            {
                roleText.ToLower().Should().Contain(text.ToLower());
            }
        }
        
        [Then(@"'([^']*)' message is displayed")]
        public void ThenMessageIsDisplayed(string errorMessage)
        {
            var actualErrorMessage =
                _page.Init<CareerPage>().NoResultsMessage.TextContentAsync().GetAwaiter().GetResult();

            actualErrorMessage.Should().Be(errorMessage);
        }

        [Then(@"The page has not changed after removed terms from search field")]
        public void ThePageHasNotChangedAfterRemovedTermsFromSearchField()
        {
            var actualListNames = _page.Component<Card>().Title.AllTextContentsAsync().GetAwaiter().GetResult();
            var expectedListNames = _position.Value;
            actualListNames.Should().IntersectWith(expectedListNames);
        }

        [Then(@"Search results equal to selected tag")]
        public void ThenSearchResultsEqualToSelectedTag(Table table)
        {
            var tags = table.Rows.SelectMany(x => x.Values).ToList();

            var texts = _page.Component<Card>()
                .DirectionTitle
                .ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult());

            foreach (var text in texts)
            {
                tags.Should().Contain(text);
            }
        }

        [Then(@"The page has tabs")]
        public void ThenThePageHasTabs(Table table)
        {
            var expectedListTabs = table.Rows.SelectMany(x => x.Values).ToList();

            var actualListTabs = _page.Component<NavigationTabs>()                
                .ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult());

            Verify.AreEqual(expectedListTabs, actualListTabs, "Expected list tabs are different from actual list tabs");
        }
    }
}