using System.Threading.Tasks;
using AutomationUtils.Utils;
using Microsoft.Playwright;
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
        private readonly ListDataPosition _position;

        public HomePageSteps(BrowserFactory browserFactory, ListDataPosition position)
        {
            _page = browserFactory.Page;
            _position = position;
        }

        [When(@"User selects '([^']*)' language")]
        public void WhenUserSelectsLanguage(string language)
        {
            _page.Init<HomePage>().SelectLanguage(language).GetAwaiter().GetResult();
        }

        [When("User clicks on Search button")]
        public void WhenUserClicksOnSearchButton()
        {
            _page.Init<HomePage>().SearchButton.ClickAsync().GetAwaiter();
        }

        [When("User clicks on clear search field button")]
        public async Task WhenUserClicksOnClearSearchFieldButton()
        {
            await _page.WaitForTimeoutAsync(1000);
            await _page.Init<HomePage>().ClearSearchFieldButton.ClickAsync();
        }

        [When("User set '([^']*)' text in search by role field")]
        public async Task WhenUserSetTextInSearchByRoleField(string text)
        {
            await _page.Init<HomePage>().InputSearchByRole.FillAsync(text);
        }

        [When("User remember names vacancies on page")]
        public async Task WhenUserRememberNameByVacanciesOnPage()
        {
            _position.Value = await _page.Init<HomePage>().HeaderCardPosition.AllTextContentsAsync();
        }

        [Then("Search results contains '([^']*)'")]
        public async void ThenSearchResultsContains(string text)
        {
            await _page.WaitForTimeoutAsync(2000);
            var texts = await _page.Init<HomePage>().HeaderCardPosition.AllTextContentsAsync();
            
            foreach (var roleText in texts)
            {
                Verify.IsTrue(roleText.Contains(text), $"'{roleText}' is not equals to '{text}'");
            }
        }

        [Then("'([^']*)' error message is correctly")]
        public async void ThenErrorMessageIsCorrectly(string errorMessage)
        {
            await _page.WaitForTimeoutAsync(2000);
            var actualErrorMessage = await _page.Init<HomePage>().ErrorMessageOnResultsCareerPage.TextContentAsync();
            Verify.AreEqual(actualErrorMessage, errorMessage, $"'{actualErrorMessage}' is not correctly");
        }

        [Then("'Techstack' logo is displayed in the main page")]
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

        [Then("Search by role field is empty")]
        public async Task ThenSearchByRoleFieldIsEmpty()
        {
            var textInSearchField = await _page.Init<HomePage>().InputSearchByRole.GetAttributeAsync("value");
            Verify.AreEqual(string.Empty, textInSearchField, "Search by role field is not empty");
        }

        [Then("Positions on the page equals to positions before enter any terms")]
        public async Task ThenPositionsOnThePageEqualsToPositionsBeforeEnterAnyTerms()
        {
            var actualListNames = await _page.Init<HomePage>().HeaderCardPosition.AllTextContentsAsync();
            var expectedListNames = _position.Value;
            Verify.AreEqual(expectedListNames, actualListNames, "List vacansions is changed after clear search field");
        }
    }
}
