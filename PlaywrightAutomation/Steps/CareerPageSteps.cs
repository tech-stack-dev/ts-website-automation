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

namespace PlaywrightAutomation.Steps
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

        // TODO move this to HeaderPage steps
        [When(@"User selects '([^']*)' language")]
        public void WhenUserSelectsLanguage(string language)
        {
            _page.Init<HeaderPage>().SelectLanguage(language).GetAwaiter().GetResult();
        }

        // TODO remove once beforeScanarios will be implemented
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
                roleText.Should().Contain(text);
            }
        }

        // TODO Move this step to CareerPageSteps
        [Then(@"'([^']*)' message is displayed")]
        public void ThenErrorMessageIsDisplayed(string errorMessage)
        {
            var actualErrorMessage =
                _page.Init<CareerPage>().NoResultsMessage.TextContentAsync().GetAwaiter().GetResult();

            actualErrorMessage.Should().Be(errorMessage);
        }


        // TODO Move to HeaderPageSteps
        [Then(@"'Techstack' logo is displayed in the main page")]
        public void ThechstackLogoIsDisplayedInTheMainPage()
        {
            _page.Init<HeaderPage>().CheckLogo();
        }

        // TODO Move to HeaderPageSteps
        [Then(@"'([^']*)' language is selected")]
        public async void ThenLanguageIsSelected(string language)
        {
            var page = _page.Init<HeaderPage>();
            Verify.AreEqual(language, await page.GetSelectedLanguage(),
                "Incorrect language is selected");
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

        // TODO move to NavigationTabSteps
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