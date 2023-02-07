using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using System.Linq;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.PageSteps
{
    [Binding]
    internal class CareerPageSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly VacancyList _position;
        private readonly SessionRandomValue _sessionRandom;

        public CareerPageSteps(BrowserFactory browserFactory, VacancyList position, SessionRandomValue sessionRandom)
        {
            _page = browserFactory.Page;
            _position = position;
            _sessionRandom = sessionRandom;
        }

        [When(@"User remembers vacancy names from Job page")]
        public void WhenUserRemembersVacancyNamesFromJobPage()
        {
            _position.Value = _page.Component<Card>().Title.AllTextContentsAsync().GetAwaiter().GetResult()
                .ToList();
        }

        [Then(@"User sees '(.*)' search value and '(.*)' count of results")]
        public void ThenUserSeesSearchValueAndCountOfResults(string expectedSearchValue, int expectedCountOfResults)
        {
            _page.WaitForLoadStateAsync(state: LoadState.Load);
            var actualSearchValue = _page.Init<JobPage>().SearchValue.TextContentAsync().GetAwaiter().GetResult();
            var actualCountOfResults = int.Parse(_page.Init<JobPage>().CountOfResults.TextContentAsync()
                .GetAwaiter().GetResult()
                .Replace(" Job", string.Empty));
            actualSearchValue.Should().BeEquivalentTo(expectedSearchValue.AddRandom(_sessionRandom));
            actualCountOfResults.Should().Be(expectedCountOfResults);
        }

        [Then(@"Search results contain '([^']*)'")]
        public void ThenSearchResultsContain(string text)
        {
            _page.WaitForLoadStateAsync(state: LoadState.Load);
            _page.Init<JobPage>().SearchValue.IsVisibleAsync().GetAwaiter().GetResult();
            var texts = _page.Component<Card>().Title.AllTextContentsAsync().GetAwaiter().GetResult();
            texts.Should().NotBeNullOrEmpty();

            foreach (var roleText in texts)
            {
                roleText.ToLower().Should().Contain(text.AddRandom(_sessionRandom).ToLower());
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
            var tags = table.Rows.SelectMany(x => x.Values).ToList().Select(x => x.AddRandom(_sessionRandom));
            var texts = _page.Component<Card>()
                .DirectionTitle.AllInnerTextsAsync().GetAwaiter().GetResult();

            foreach (var text in texts)
            {
                tags.Should().Contain(text);
            }
        }

        [Then(@"Jobs block on Career page has tabs")]
        public void ThenJobsBlockOnCareerPageHasTabs(Table table)
        {
            var expectedListTabs = table.Rows.SelectMany(x => x.Values).ToList();

            var actualListTabs = _page.Component<NavigationTabs>().AllInnerTextsAsync().GetAwaiter().GetResult();

            actualListTabs.Should().Equal(expectedListTabs);
        }

        [Then(@"Dropdowns are expanded on '([^']*)' container")]
        public void ThenDropdownsAreExpandedOnContainer(string container, Table table)
        {
            var dropdowns = table.Rows.SelectMany(x => x.Values).ToList();

            foreach (var dropdown in dropdowns)
            {
                var dropdownIsOpen = _page.Component<FilterGroupWrapper>(dropdown,
                        new BaseWebComponent.Properties { ParentSelector = WebContainer.GetLocator(container) })
                    .CollapsibleState();

                dropdownIsOpen.Should().BeTrue();
            }
        }
    }
}