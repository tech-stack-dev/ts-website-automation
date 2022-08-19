using System.Linq;
using AutomationUtils.Utils;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.FilterListWrapper;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.UnitTests;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

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

        [When(@"User selects '([^']*)' language")]
        public void WhenUserSelectsLanguage(string language)
        {
            _page.Init<HomePage>().SelectLanguage(language).GetAwaiter().GetResult();
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
                roleText.Should().Contain(text);
            }
        }

        [Then(@"'([^']*)' message is displayed")]
        public void ThenErrorMessageIsDisplayed(string errorMessage)
        {
            var actualErrorMessage =
                _page.Init<HomePage>().NoResultsMessage.TextContentAsync().GetAwaiter().GetResult();
            actualErrorMessage.Should().Be(errorMessage);
        }

        [Then(@"'Techstack' logo is displayed in the main page")]
        public void ThechstackLogoIsDisplayedInTheMainPage()
        {
            _page.Init<HomePage>().CheckLogo();
        }

        [Then(@"'([^']*)' language is selected")]
        public async void ThenLanguageIsSelected(string language)
        {
            var page = _page.Init<HomePage>();
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

        [Then(@"Selected tags are displayed as active in Filters list")]
        public void ThenSelectedTagsAreDisplayedAsActiveInFiltersList(Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

            var parent = _page
                .Component<ActiveTagsGroupWrapper>(new Properties { ParentSelector = WebContainer.GetLocator("CareerPage") });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                var tagDisplayedState = tag.IsVisibleAsync().GetAwaiter().GetResult();
                tagDisplayedState.Should().BeTrue();
            }
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

        // TODO review this step
        [Then(@"Selected tags has correct color")]
        public void ThenSelectedTagsHasCorrectColor(Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

            foreach (var name in tagsName)
            {
                var removedStuff = name.RemoveSpaceAndSlash();
                var tags = _page.Component<Tag>(removedStuff,
                    new Properties { Parent = _page.Component<Tag>().ChosenTags });
                var backgroundColor = LocatorExtensions.GetBackgroundColor(tags);
                var expectedColor = ColorsConvertor.Converter("orange yellow");
                backgroundColor.Should().Be(expectedColor);
            }
        }

        // TODO move to tags component steps
        // TODO sight bar - > filter side bar
        [Then(@"Selected tags are displayed in '([^']*)' sight bar on '([^']*)' container")]
        public void ThenSelectedTagsAreDisplayedInSightBarOnContainer(string filterGroupHeader, string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

            var parent = _page
                .Component<FilterGroupWrapper>(filterGroupHeader, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                tag.SelectedState().Should().BeTrue();
            }
        }

        // TODO move to tags component steps
        // TODO sight bar - > filter side bar
        [Then(@"Selected tags from '([^']*)' sight bar has correctly color on '([^']*)' container")]
        public void ThenSelectedTagsFromSightBarHasCorrectlyColorOnContainer(string filterGroupHeader, string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

            var parent = _page
                .Component<FilterGroupWrapper>(filterGroupHeader, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var removedStuff = name.RemoveSpaceAndSlash();

                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                var backgroundColor = tag.GetBackgroundColor();
                var expectedColor = ColorsConvertor.Converter("orange yellow");

                backgroundColor.Should().Be(expectedColor);
            }
        }

        [Then(@"All selected tags was cancel")]
        public void ThenAllSelectedTagsWasCancel()
        {
            var selectedTags = _page.Component<Tag>().ActiveTagsIntoDropdown.AllTextContentsAsync().GetAwaiter()
                .GetResult();
            selectedTags.Should().BeEmpty();
        }

        [Then(@"User in on the '([^']*)' block")]
        public void ThenUserInOnTheBlock(string blockName)
        {
            var block = _page.Component<NavigationTabs>(blockName);
            var displayedBlock = block.IsVisibleAsync().GetAwaiter().GetResult();
            displayedBlock.Should().BeTrue();
            var activeBlock = block.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-nav-tab");
            activeBlock.Should().BeTrue();
        }
    }
}