using System.Linq;
using System.Text.RegularExpressions;
using AutomationUtils.Extensions;
using AutomationUtils.Utils;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
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
        private readonly SelectedTagsList _selectedTags;

        public CareerPageSteps(BrowserFactory browserFactory, VacancyList position, SelectedTagsList selectedTags)
        {
            _page = browserFactory.Page;
            _position = position;
            _selectedTags = selectedTags;
        }

        [When(@"User selects '([^']*)' language")]
        public void WhenUserSelectsLanguage(string language)
        {
            _page.Init<HomePage>().SelectLanguage(language).GetAwaiter().GetResult();
        }

        //[When(@"User clicks on '([^']*)' button")]
        //public void WhenUserClicksOnButton(string buttonName)
        //{
        //    _page.Component<Button>(buttonName).ClickAsync().GetAwaiter().GetResult();
        ////}

        //[When(@"User clicks '([^']*)' div button")]
        //public void WhenUserClicksDivButton(string divButtonName)
        //{
        //    _page.Component<DivButton>(divButtonName, new Properties{Parent = _page.Init<HomePage>().Container}).ClickAsync().GetAwaiter().GetResult();
        ////}

        //[When(@"User clicks on 'Clear' search field button")]
        //public void WhenUserClicksOnClearSearchFieldButton()
        //{
        //    _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
        //    _page.Init<HomePage>().ClearSearchFieldButton.ClickAsync().GetAwaiter().GetResult();
        //}

        //[When(@"User set '([^']*)' text to '([^']*)' by role field")]
        //public void WhenUserSetTextToByRoleField(string text, string fieldName)
        //{
        //    _page.Component<FieldInput>(fieldName, new Properties()
        //    {
        //        Parent = _page.Init<HomePage>().Container
        //    }).FillAsync(text).GetAwaiter().GetResult();
        ////}

        //[When(@"User set first vacancy from page in '([^']*)' by role field")]
        //public void WhenUserSetFirstVacancyFromPageInByRoleField(string fieldName)
        //{
        //    string vacancyName = _page.Component<Card>("").CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
        //        .First();
        //    _position.Value.Add(vacancyName);
        //    _page.Component<FieldInput>(fieldName, new Properties
        //    {
        //        Parent = _page.Init<
        //            HomePage>().Container
        //    }).FillAsync(vacancyName).GetAwaiter().GetResult();
        ////}

        //[When(@"User set part of the name first vacancy from page in '([^']*)' by role field")]
        //public void WhenUserSetPartOfTheNameFirstVacancyFromPageInByRoleField(string fieldName)
        //{
        //    string vacancyName = _page.Component<Card>("").CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
        //        .First();
        //    var partName = Regex.Match(vacancyName, @"^([\w\-]+)");
        //    _position.Value.Add(partName.Value);
        //    _page.Component<FieldInput>(fieldName, new Properties() {Parent = _page.Init<HomePage>().Container})
        //        .FillAsync(partName.Value).GetAwaiter().GetResult();
        //}

        [When(@"User remembers vacancy names from Job page")]
        public void WhenUserRemembersVacancyNamesFromJobPage()
        {
            _position.Value = _page.Component<Card>("").CardHeader().AllTextContentsAsync().GetAwaiter().GetResult()
                .ToList();
        }

        //[When(@"User selects '([^']*)' vacancy from '([^']*)' dropdown")]
        //public void WhenUserSelectsVacancyFromDropdown(string tagName, string dropdownName)
        //{
        //    _page.Component<Tag>(tagName, new Properties{Parent = _page.Component<Filter>(dropdownName).PathToTags()}).ClickAsync().GetAwaiter().GetResult();
        ////}

        //[When(@"User clicks on '([^']*)' available tag from '([^']*)' dropdown")]
        //public void WhenUserClicksOnAvailableTagFromDropdown(int numberTags, string dropdownName)
        //{
        //    var tagsList = _page.Component<Tag>("", new Properties
        //        {Parent = _page.Component<Filter>(dropdownName).PathToTags()});

        //    for (int i = 0; i < numberTags; i++)
        //    {
        //        tagsList.Nth(i).ClickAsync().GetAwaiter().GetResult();
        //        var attribute = tagsList.Nth(i).GetAttributeAsync("class").GetAwaiter().GetResult()
        //            .Contains("active-tag");
        //        if (attribute)
        //        {
        //            _selectedTags.Value.Add(tagsList.Nth(i).TextContentAsync().GetAwaiter().GetResult());
        //        }
        //        else
        //        {
        //            numberTags++;
        //        }
        //    }
        ////}

        //[When(@"User selects tag from '([^']*)' dropdown")]
        //public void WhenUserSelectsTagFromDropdown(string dropdownName, Table table)
        //{
        //    var tags = table.Rows.Select(row => row.Values.FirstOrDefault()).ToList();

        //    foreach (var vacancyName in tags)
        //    {
        //        _page.Component<Tag>(vacancyName, new Properties{Parent = _page.Component<Filter>(dropdownName).PathToTags()}).ClickAsync().GetAwaiter().GetResult();
        //    }
        ////}

        //[When(@"User clicks on '([^']*)' dropdown")]
        //public void WhenUserClicksOnDropdown(string dropdownName)
        //{
        //    _page.Component<Filter>(dropdownName).ClickAsync().GetAwaiter().GetResult();
        //}

        [Then(@"Search results contains '([^']*)'")]
        public void ThenSearchResultsContains(string text)
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            var texts = _page.Component<Card>("").CardTag().AllTextContentsAsync().GetAwaiter().GetResult();

            foreach (var roleText in texts)
            {
                Verify.IsTrue(roleText.Contains(text), $"'{roleText}' is not contains '{text}'");
            }
        }

        //[Then(@"Tag name displayed in '([^']*)' dropdown field")]
        //public void ThenTagNameDisplayedInDropdownField(string dropdownName)
        //{
        //    var textInField = _page.Component<Filter>(dropdownName).InnerTextAsync().GetAwaiter().GetResult();
        //    var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s]+\b"));
        //    var selectedTag = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList().First();
        //    selectedTag.Should().Be(textInField);
        //}

        [Then(@"Search results equals to selected tags")]
        public void ThenSearchResultsEqualsToSelectedTags()
        {
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            var tagsWithoutNumber = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList();

            var texts = _page.Component<Card>("").CardTag().AllTextContentsAsync().GetAwaiter().GetResult().ToList();

            foreach (var text in texts)
            {
                var comparison = tagsWithoutNumber.Any(x => x.Equals(text));
                comparison.Should().BeTrue();
            }
        }

        [Then(@"Search results contain desired value")]
        public void ThenSearchResultsContainDesiredValue()
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            var values = _page.Component<Card>("").CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult();

            foreach (var value in values)
            {
                var comparison = value.Contains(_position.Value.ToString(""));
                comparison.Should().BeTrue();
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

        //[Then(@"'([^']*)' by role field is empty")]
        //public void ThenByRoleFieldIsEmpty(string fieldName)
        //{
        //    var textInSearchField =
        //        _page.Component<FieldInput>(fieldName, new Properties() {Parent = _page.Init<HomePage>().Container})
        //            .GetAttributeAsync("value").GetAwaiter().GetResult();
        //    string.Empty.Should().Be(textInSearchField);
        //}

        [Then(@"The page has not changed after removed terms from search field")]
        public void ThePageHasNotChangedAfterRemovedTermsFromSearchField()
        {
            var actualListNames = _page.Component<Card>("").CardHeader().AllTextContentsAsync().GetAwaiter().GetResult();
            var expectedListNames = _position.Value;
            actualListNames.Should().IntersectWith(expectedListNames);
        }

        [Then(@"'([^']*)' tag is displayed")]
        public void ThenTagIsDisplayed(string tag)
        {
            var displayedTags = _page.Component<Tag>("", new Properties() {Parent = _page.Component<Tag>().ChosenTags()})
                .IsVisibleAsync().GetAwaiter().GetResult();
            displayedTags.Should().BeTrue();
        }

        [Then(@"Selected tags are displayed")]
        public void ThenSelectedTagsAreDisplayed()
        {
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            var tagsWithoutNumber = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.Replace(" ", string.Empty).Replace("/", string.Empty);
                var tags = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").ChosenTags()});
                var displayedSelectedTags = tags.IsVisibleAsync().GetAwaiter().GetResult();
                displayedSelectedTags.Should().BeTrue();
            }
        }

        [Then(@"Selected tags has correctly color")]
        public void ThenSelectedTagsHasCorrectlyColor()
        {
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            var tagsWithoutNumber = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.Replace(" ", string.Empty).Replace("/", string.Empty);
                var tags = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").ChosenTags()});
                var backgroundColor = LocatorExtensions.GetBackgroundColor(tags);
                var expectedColor = ColorsConvertor.Converter("orange yellow");
                backgroundColor.Should().Be(expectedColor);
            }
        }

        [Then(@"Selected tags are displayed in '([^']*)' sight bar")]
        public void ThenSelectedTagsAreDisplayedInSightBar(string sightBarName)
        {
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            var tagsWithoutNumber = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.Replace(" ", string.Empty).Replace("/", string.Empty);
                var tag = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").SelectedTagsFromSightBar(sightBarName)});
                var tagsDisplayedInSighBar = tag.IsVisibleAsync().GetAwaiter().GetResult();
                tagsDisplayedInSighBar.Should().BeTrue();
            }
        }

        [Then(@"Selected tags from '([^']*)' sight bar has correctly color")]
        public void ThenSelectedTagsFromSightBarHasCorrectlyColor(string sightBarName)
        {
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            var tagsWithoutNumber = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.Replace(" ", string.Empty).Replace("/", string.Empty);

                var tag = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").SelectedTagsFromSightBar(sightBarName)});
                var backgroundColor = LocatorExtensions.GetBackgroundColor(tag);
                var expectedColor = ColorsConvertor.Converter("orange yellow");
                backgroundColor.Should().Be(expectedColor);
            }
        }

        //[Then(@"Count of selected tags from '([^']*)' is correctly")]
        //public void ThenCountOfSelectedTagsFromIsCorrectly(string dropdownName)
        //{
        //    var selectedTags = _page.Component<Tag>("").SelectedTagsList().CountAsync().GetAwaiter().GetResult();
        //    var counterTags = int.Parse(_page.Component<Filter>(dropdownName).ActiveTagsCounter().TextContentAsync()
        //        .GetAwaiter()
        //        .GetResult());
        //    selectedTags.Should().Be(counterTags);
        //}

        [Then(@"Search results contains selected tags from dropdown")]
        public void ThenSearchResultsContainsSelectedTagsFromDropdown(Table table)
        {
            var tags = table.Rows.Select(row => row.Values.FirstOrDefault()).ToList();
            var texts = _page.Component<Card>("").CardTag().AllTextContentsAsync().GetAwaiter().GetResult().ToList();

            foreach (var text in texts)
            {
                var comparison = tags.Any(x => x.Equals(text));
                comparison.Should().BeTrue();
            }
        }

        [Then(@"All selected tags was cancel")]
        public void ThenAllSelectedTagsWasCancel()
        {
            var selectedTags = _page.Component<Tag>("").SelectedTagsList().AllTextContentsAsync().GetAwaiter()
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