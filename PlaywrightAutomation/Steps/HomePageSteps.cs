using System.Linq;
using AutomationUtils.Extensions;
using AutomationUtils.Utils;
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
    internal class HomePageSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly VacancyList _position;

        public HomePageSteps(BrowserFactory browserFactory, VacancyList position)
        {
            _page = browserFactory.Page;
            _position = position;
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
           _page.Init<HomePage>().Container.Locator(_page.Component<DivButton>(divButtonName).Construct()).ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User clicks on 'Clear' search field button")]
        public void WhenUserClicksOnClearSearchFieldButton()
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            _page.Init<HomePage>().ClearSearchFieldButton.ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User set '([^']*)' text in '([^']*)' by role field")]
        public void WhenUserSetTextInByRoleField(string text, string fieldName)
        {
            _page.Init<HomePage>().Container.Locator(_page.Component<FieldInput>($"{fieldName}").Construct())
                .FillAsync(text).GetAwaiter().GetResult();
            var filed = _page.Init<HomePage>().Container.Locator(_page.Component<FieldInput>($"{fieldName}").Construct())
                .GetAttributeAsync("value").GetAwaiter().GetResult();
            Verify.AreEqual(text, filed, "");
        }

        [When(@"User remember names from '([^']*)' vacancies on page")]
        public void WhenUserRememberNameFromVacanciesOnPage(string card)
        {
            _position.Value = _page.Component<Card>(card).GetHeaderCard().AllTextContentsAsync().GetAwaiter().GetResult();
        }

        [When(@"User selects '([^']*)' vacancy from '([^']*)' dropdown")]
        public void WhenUserSelectsSoftwareDevelopmentVacancyFromDirectionDropdown(string tagName, string dropdownName)
        {
            _page.Component<Tag>().TagFromDropdown(dropdownName, tagName).ClickAsync().GetAwaiter().GetResult();
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
            var texts = _page.Component<Card>("Card").GetHeaderCard().AllTextContentsAsync().GetAwaiter().GetResult();
            
            foreach (var roleText in texts)
            {
                Verify.IsTrue(roleText.Contains(text), $"'{roleText}' is not equals to '{text}'");
            }
        }

        [Then(@"'([^']*)' message is correctly")]
        public void ThenErrorMessageIsCorrectly(string errorMessage)
        {
            var actualErrorMessage = _page.Init<HomePage>().MessageAboutWithoutResults.TextContentAsync().GetAwaiter().GetResult();
            Verify.AreEqual(actualErrorMessage, errorMessage, $"'{actualErrorMessage}' is not correctly");
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
        public void ThenSearchByRoleFieldIsEmpty(string fieldName)
        {
            var textInSearchField = _page.Init<HomePage>().Container.Locator(_page.Component<FieldInput>(fieldName).Construct()).GetAttributeAsync("value").GetAwaiter().GetResult();
            Verify.AreEqual(string.Empty, textInSearchField, "Search by role field is not empty");
        }

        [Then(@"The page has not changed after removed terms from search field")]
        public void ThePageHasNotChangedAfterRemovedTermsFromSearchField()
        {
            var actualListNames = _page.Component<Card>("Card").GetHeaderCard().AllTextContentsAsync().GetAwaiter().GetResult();
            var expectedListNames = _position.Value;
            Verify.AreEqual(expectedListNames, actualListNames, "List vacansions is changed after clear search field");
        }

        [Then(@"'([^']*)' tag is displayed")]
        public void ThenSelectedTagIsDisplayed(string tag)
        {
            Verify.IsTrue(_page.Component<Tag>(tag).ChosenTags().First.IsVisibleAsync().GetAwaiter().GetResult(),$"'{tag}' is not displayed");
        }

        [Then(@"Count of selected tags from '([^']*)' is correctly")]
        public void ThenCountOfSelectedTagsFromIsCorrectly(string dropdownName)
        {
            var selectedTags = _page.Component<Tag>().SelectedTagsList().CountAsync().GetAwaiter().GetResult();
            var counterTags = int.Parse(_page.Component<Filter>(dropdownName).ActiveTagsCounter().TextContentAsync().GetAwaiter()
                .GetResult());
            Verify.AreEqual(selectedTags, counterTags, $"'{selectedTags}' are not equal to '{counterTags}' in field");
        }

        [Then(@"Search results contains from dropdown")]
        public void ThenSearchResultsContainsFromDropdown(Table table)
        {
            var tags = table.Rows.Select(row => row.Values.FirstOrDefault()).ToList();
            var texts = _page.Component<Card>("Card").GetHeaderCard().AllTextContentsAsync().GetAwaiter().GetResult().ToList();
            
            for (int i = 0; i < tags.Count; i++)
            {
                var tag = tags[i];

                for (int j = texts.Count - 1; j > -1; j--)
                {
                    var text = texts[j];

                    var textWithoutSpace = text.Replace(" ", string.Empty).Replace("/", string.Empty);

                    if (textWithoutSpace.Contains(tag))
                    {
                        texts.Remove(text);
                    }
                }
            }
            
            Verify.IsFalse(texts.Any(), $"'{texts.ToString(", ")}' is not equals no one tags");
        }

        [Then(@"All selected tags was cancel")]
        public void ThenAllSelectedTagsWasCancel()
        {
            var selectedTags = _page.Component<Tag>().SelectedTagsList().CountAsync().GetAwaiter().GetResult();
            Verify.AreEqual(0, selectedTags, "Not all tags was cancel");
        }

        [Then(@"User in on the '([^']*)' block")]
        public void ThenUserInOnTheBlock(string blockName)
        {
            var block = _page.GetComponent<NavigationTabs>(blockName);
            Verify.IsTrue(block.IsVisibleAsync().GetAwaiter().GetResult(), "Jobs block is not visible");
            Verify.IsTrue(block.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-nav-tab"), "Jobs block is not selected");
        }
    }
}
