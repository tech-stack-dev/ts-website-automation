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

        [When(@"User clicks on 'Clear' search field button")]
        public void WhenUserClicksOnClearSearchFieldButton()
        {
            _page.Init<HomePage>().ClearSearchFieldButton.ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User set '([^']*)' text in '([^']*)' by role field")]
        public void WhenUserSetTextInByRoleField(string text, string fieldName)
        {
            _page.Init<HomePage>().Container.Locator(_page.Component<FieldInput>($"{fieldName}").Construct())
                .FillAsync(text).GetAwaiter().GetResult();
            var a = _page.Init<HomePage>().Container.Locator(_page.Component<FieldInput>("Search").Construct()).ElementHandleAsync().GetAwaiter().GetResult();
            _page.WaitForFunctionAsync($"a => a.getAttribute('value').includes('{text}')", a);
        }

        [When(@"User remember names from '([^']*)' vacancies on page")]
        public void WhenUserRememberNameFromVacanciesOnPage(string card)
        {
            _position.Value = _page.Component<Card>(card).GetHeaderCard().AllTextContentsAsync().GetAwaiter().GetResult();
        }

        [When(@"User selects '([^']*)' vacancy from '([^']*)' dropdown")]
        public void WhenUserSelectsSoftwareDevelopmentVacancyFromDirectionDropdown(string vacancyName, string dropdownName)
        {
            _page.GetComponent<Filter>(dropdownName).ClickAsync().GetAwaiter().GetResult();
            _page.Init<HomePage>().Container.Locator(_page.Component<Tag>(vacancyName).Construct()).ClickAsync().GetAwaiter().GetResult();
        }

        [Then(@"Search results contains '([^']*)'")]
        public void ThenSearchResultsContains(string text)
        {
            var texts = _page.Component<Card>("Card").GetHeaderCard().AllTextContentsAsync().GetAwaiter().GetResult();
            
            foreach (var roleText in texts)
            {
                Verify.IsTrue(roleText.Contains(text), $"'{roleText}' is not equals to '{text}'");
            }
        }

        [Then(@"'([^']*)' error message is correctly")]
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

        [Then(@"Positions on the page equals to positions before enter any terms")]
        public void ThenPositionsOnThePageEqualsToPositionsBeforeEnterAnyTerms()
        {
            var actualListNames = _page.Component<Card>("Card").GetHeaderCard().AllTextContentsAsync().GetAwaiter().GetResult();
            var expectedListNames = _position.Value;
            Verify.AreEqual(expectedListNames, actualListNames, "List vacansions is changed after clear search field");
        }

        [Then(@"Selected tag is displayed")]
        public void ThenSelectedTagIsDisplayed()
        {

        }
    }
}
