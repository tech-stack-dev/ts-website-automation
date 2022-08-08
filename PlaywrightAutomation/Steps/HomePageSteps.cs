using System.Linq;
using System.Text.RegularExpressions;
using AutomationUtils.Extensions;
using AutomationUtils.Utils;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.Base;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class HomePageSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly VacancyList _position;
        private readonly SelectedTagsList _selectedTags;

        public HomePageSteps(BrowserFactory browserFactory, VacancyList position, SelectedTagsList selectedTags)
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

        [When(@"User clicks on '([^']*)' button")]
        public void WhenUserClicksOnButton(string buttonName)
        {
            _page.GetComponent<Button>(buttonName).ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User clicks '([^']*)' div button")]
        public void WhenUserClicksDivButton(string divButtonName)
        {
            _page.GetComponent<DivButton>(divButtonName,
                new Properties()
                    {Parent = _page.Init<HomePage>().Container}).ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User clicks on 'Clear' search field button")]
        public void WhenUserClicksOnClearSearchFieldButton()
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            _page.Init<HomePage>().ClearSearchFieldButton.ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User set '([^']*)' text to '([^']*)' by role field")]
        public void WhenUserSetTextToByRoleField(string text, string fieldName)
        {
            _page.GetComponent<FieldInput>(fieldName, new Properties()
            {
                Parent = _page.Init<
                    HomePage>().Container
            }).FillAsync(text).GetAwaiter().GetResult();
            var field = _page.GetComponent<FieldInput>(fieldName, new Properties()
            {
                Parent = _page.Init<
                    HomePage>().Container
            }).GetAttributeAsync("value").GetAwaiter().GetResult();
            Verify.AreEqual(text, field, "Search by role field is empty");
        }

        [When(@"User set first vacancy from page in '([^']*)' by role field")]
        public void WhenUserSetFirstVacancyFromPageInByRoleField(string fieldName)
        {
            string vacancyName = _page.Component<Card>().CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
                .First();
            _position.Value.Add(vacancyName);
            _page.GetComponent<FieldInput>(fieldName, new Properties()
            {
                Parent = _page.Init<
                    HomePage>().Container
            }).FillAsync(vacancyName).GetAwaiter().GetResult();
            var field = _page.GetComponent<FieldInput>(fieldName, new Properties()
            {
                Parent = _page.Init<
                    HomePage>().Container
            }).GetAttributeAsync("value").GetAwaiter().GetResult();
            Verify.AreEqual(vacancyName, field, "Search by role field is empty");
        }

        [When(@"User set part of the name first vacancy from page in '([^']*)' by role field")]
        public void WhenUserSetPartOfTheNameFirstVacancyFromPageInByRoleField(string fieldName)
        {
            string vacancyName = _page.Component<Card>().CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
                .First();
            var partName = Regex.Match(vacancyName, @"^([\w\-]+)");
            _position.Value.Add(partName.Value);
            _page.GetComponent<FieldInput>(fieldName, new Properties() {Parent = _page.Init<HomePage>().Container})
                .FillAsync(partName.Value).GetAwaiter().GetResult();
            var filed = _page
                .GetComponent<FieldInput>(fieldName, new Properties() {Parent = _page.Init<HomePage>().Container})
                .GetAttributeAsync("value").GetAwaiter().GetResult();
            Verify.AreEqual(partName.Value, filed, "Search by role field is empty");
        }


        [When(@"User remembers vacancy names from Job page")]
        public void WhenUserRemembersVacancyNamesFromJobPage()
        {
            _position.Value = _page.Component<Card>().CardHeader().AllTextContentsAsync().GetAwaiter().GetResult()
                .ToList();
        }

        [When(@"User selects '([^']*)' vacancy from '([^']*)' dropdown")]
        public void WhenUserSelectsVacancyFromDropdown(string tagName, string dropdownName)
        {
            _page.Component<Tag>().TagFromDropdown(dropdownName, tagName).ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User clicks on '([^']*)' available tag from '([^']*)' dropdown")]
        public void WhenUserClicksOnAvailableTagFromDropdown(int numberTags, string dropdownName)
        {
            var tagsList = _page.Component<Tag>().TagFromDropdown(dropdownName, "");

            for (int i = 0; i < numberTags; i++)
            {
                tagsList.Nth(i).ClickAsync().GetAwaiter().GetResult();
                var attribute = tagsList.Nth(i).GetAttributeAsync("class").GetAwaiter().GetResult()
                    .Contains("active-tag");
                if (attribute)
                {
                    _selectedTags.Value.Add(tagsList.Nth(i).TextContentAsync().GetAwaiter().GetResult());
                }
                else
                {
                    numberTags++;
                }
            }
        }

        [When(@"User selects tag from '([^']*)' dropdown")]
        public void WhenUserSelectsTagFromDropdown(string dropdownName, Table table)
        {
            var tags = table.Rows.Select(row => row.Values.FirstOrDefault()).ToList();

            foreach (var vacancyName in tags)
            {
                _page.Component<Tag>().TagFromDropdown(dropdownName, vacancyName).ClickAsync().GetAwaiter().GetResult();
            }
        }

        [When(@"User clicks on '([^']*)' dropdown")]
        public void WhenUserClicksOnDropdown(string dropdownName)
        {
            _page.GetComponent<Filter>(dropdownName).ClickAsync().GetAwaiter().GetResult();
        }

        [Then(@"Search results contains '([^']*)'")]
        public void ThenSearchResultsContains(string text)
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            var texts = _page.Component<Card>().CardTag().AllTextContentsAsync().GetAwaiter().GetResult();

            foreach (var roleText in texts)
            {
                Verify.IsTrue(roleText.Contains(text), $"'{roleText}' is not contains '{text}'");
            }
        }

        [Then(@"Tag name displayed in '([^']*)' dropdown field")]
        public void ThenTagNameDisplayedInDropdownField(string dropdownName)
        {
            var textInField = _page.GetComponent<Filter>(dropdownName).InnerTextAsync().GetAwaiter().GetResult();
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s]+\b"));
            var selectedTag = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList().First();
            Verify.AreEqual(selectedTag, textInField,
                $"'{selectedTag}' is not equals to '{textInField}' in Direction dropdown");
        }

        [Then(@"Search results equals to selected tags")]
        public void ThenSearchResultsEqualsToSelectedTags()
        {
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            var tagsWithoutNumber = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList();

            var texts = _page.Component<Card>().CardTag().AllTextContentsAsync().GetAwaiter().GetResult().ToList();

            foreach (var text in texts)
            {
                Verify.IsTrue(tagsWithoutNumber.Any(x => x.Equals(text)),
                    $"'{text}' is not equals to '{tagsWithoutNumber.ToString(", ")}' tag");
            }
        }

        [Then(@"Search results contains to recorded value")]
        public void ThenSearchResultsContainsToRecordedValue()
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            var values = _page.Component<Card>().CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult();

            foreach (var value in values)
            {
                Verify.IsTrue(value.Contains(_position.Value.ToString("")),
                    $"Search result '{value}' is not contains to '{_position.Value.ToString("")}'");
            }
        }

        [Then(@"'([^']*)' message is displayed")]
        public void ThenErrorMessageIsDisplayed(string errorMessage)
        {
            var actualErrorMessage =
                _page.Init<HomePage>().NoResultsMessage.TextContentAsync().GetAwaiter().GetResult();
            Verify.AreEqual(actualErrorMessage, errorMessage, $"'{actualErrorMessage}' is not displayed");
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

        [Then(@"'([^']*)' by role field is empty")]
        public void ThenByRoleFieldIsEmpty(string fieldName)
        {
            var textInSearchField =
                _page.GetComponent<FieldInput>(fieldName, new Properties() {Parent = _page.Init<HomePage>().Container})
                    .GetAttributeAsync("value").GetAwaiter().GetResult();
            Verify.AreEqual(string.Empty, textInSearchField, "Search by role field is not empty");
        }

        [Then(@"The page has not changed after removed terms from search field")]
        public void ThePageHasNotChangedAfterRemovedTermsFromSearchField()
        {
            var actualListNames = _page.Component<Card>().CardHeader().AllTextContentsAsync().GetAwaiter().GetResult();
            var expectedListNames = _position.Value;
            Verify.AreEqual(expectedListNames, actualListNames, "List vacansions is changed after clear search field");
        }

        [Then(@"'([^']*)' tag is displayed")]
        public void ThenTagIsDisplayed(string tag)
        {
            Verify.IsTrue(
                _page.GetComponent<Tag>(new Properties() {Parent = _page.Component<Tag>().ChosenTags()})
                    .IsVisibleAsync().GetAwaiter().GetResult(), $"'{tag}' tag is not displayed");
        }

        [Then(@"Selected tags are displayed")]
        public void ThenSelectedTagsAreDisplayed()
        {
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            var tagsWithoutNumber = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.Replace(" ", string.Empty).Replace("/", string.Empty);
                var tags = _page.GetComponent<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>().ChosenTags()});
                Verify.IsTrue(tags.IsVisibleAsync().GetAwaiter().GetResult(),
                    $"'{tags.AllInnerTextsAsync().GetAwaiter().GetResult().ToString(", ")}' is not displayed");
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
                var tags = _page.GetComponent<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>().ChosenTags()});
                var backgroundColor = tags.EvaluateAsync("element => getComputedStyle(element).backgroundColor")
                    .GetAwaiter().GetResult().Value.ToString();
                Verify.AreEqual("rgb(255, 198, 0)", backgroundColor, "Background color is not correctly");
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
                var tag = _page.GetComponent<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>().SelectedTagsFromSightBar(sightBarName)});
                Verify.IsTrue(tag.IsVisibleAsync().GetAwaiter().GetResult(),
                    $"'{tag.AllInnerTextsAsync().GetAwaiter().GetResult().ToString(", ")}' is not displayed");
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

                var tag = _page.GetComponent<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>().SelectedTagsFromSightBar(sightBarName)});
                var backgroundColor = tag.EvaluateAsync("element => getComputedStyle(element).backgroundColor")
                    .GetAwaiter().GetResult().Value.ToString();
                Verify.AreEqual("rgb(255, 198, 0)", backgroundColor, "Background color is not correctly");
            }
        }

        [Then(@"Count of selected tags from '([^']*)' is correctly")]
        public void ThenCountOfSelectedTagsFromIsCorrectly(string dropdownName)
        {
            var selectedTags = _page.Component<Tag>().SelectedTagsList().CountAsync().GetAwaiter().GetResult();
            var counterTags = int.Parse(_page.Component<Filter>(dropdownName).ActiveTagsCounter().TextContentAsync()
                .GetAwaiter()
                .GetResult());
            Verify.AreEqual(selectedTags, counterTags,
                $"'{selectedTags}' are not equal to '{counterTags}' in '{dropdownName}' field");
        }

        [Then(@"Search results contains selected tags from dropdown")]
        public void ThenSearchResultsContainsSelectedTagsFromDropdown(Table table)
        {
            var tags = table.Rows.Select(row => row.Values.FirstOrDefault()).ToList();
            var texts = _page.Component<Card>().CardTag().AllTextContentsAsync().GetAwaiter().GetResult().ToList();

            foreach (var text in texts)
            {
                Verify.IsTrue(tags.Any(x => x.Equals(text)), $"'{text}' is");
            }
        }

        [Then(@"All selected tags was cancel")]
        public void ThenAllSelectedTagsWasCancel()
        {
            var selectedTags = _page.Component<Tag>().SelectedTagsList().AllTextContentsAsync().GetAwaiter()
                .GetResult();
            Verify.IsFalse(selectedTags.Any(), "Not all tags was cancel");
        }

        [Then(@"User in on the '([^']*)' block")]
        public void ThenUserInOnTheBlock(string blockName)
        {
            var block = _page.GetComponent<NavigationTabs>(blockName);
            Verify.IsTrue(block.IsVisibleAsync().GetAwaiter().GetResult(), "Jobs block is not visible");
            Verify.IsTrue(block.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-nav-tab"),
                "Jobs block is not selected");
        }
    }
}