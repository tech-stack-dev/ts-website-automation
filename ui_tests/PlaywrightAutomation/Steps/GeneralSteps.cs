using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class GeneralSteps : SpecFlowContext
    {
        private const string URL_PAGE_NUMBER = "{0}?page={1}";

        private IPage _page;
        private readonly BrowserFactory _browserFactory;
        private readonly CreatedCareer _createdCareer;

        public GeneralSteps(BrowserFactory browserFactory, CreatedCareer createdCareer)
        {
            _page = browserFactory.Page;
            _browserFactory = browserFactory;
            _createdCareer = createdCareer;
        }

        [Given(@"User is on career website")]
        public void GivenUserIsOnCareerWebsite()
        {
            _page = _browserFactory
                .OpenNewPage(UrlProvider.Application)
                .GetAwaiter()
                .GetResult();
        }

        [Given(@"User is on '([^']*)' page")]
        public void GivenUserIsOnPage(string url)
        {
            _page = _browserFactory
                .OpenNewPage(url)
                .GetAwaiter()
                .GetResult();
        }

        [When(@"User opens page with '([^']*)' index via URL")]
        public void WhenUserOpensPageWithIndexViaURL(int number)
        {
            // Open a specific page according to the pagination in the staging
            _page.GotoAsync(string.Format(URL_PAGE_NUMBER, UrlProvider.Application, number))
             .GetAwaiter()
             .GetResult();
        }

        [When(@"User expects tag and vacancy created in 'Contentful' on the page")]
        public void WhenUserExpectsTagAndVacancyCreatedInContentfulOnThePage(Table table)
        {
            var objectList = table.Rows.ToDictionary(r => r["Name"], r => r["Type"]);

            foreach (var type in objectList)
            {
                switch (type.Value)
                {
                    case "Tag":
                        var tagElement = _page.Component<Tag>(type.Key);
                        _page.WaiterWithReloadPage(tagElement);
                        tagElement.Count().Should().NotBe(0);
                        objectList.Remove(type.Key);
                        continue;
                    case "Vacancy":
                        var vacancyElement = _page.Component<Card>(type.Key);
                        _page.WaiterWithReloadPage(vacancyElement);
                        vacancyElement.Count().Should().NotBe(0);
                        objectList.Remove(type.Key);
                        continue;
                    default:
                        throw new Exception($"'{type.Value}' element with '{type.Key}' name is not displayed");
                }
            }
        }

        [When(@"User waits careers with mocked data")]
        public void WhenUserWaitsCareersWithMockedData()
        {
            var careers = _createdCareer.Value.Select(x => x.NameUs).ToList();
            _page.Init<CareerMainPage>().WaitForMockedCareers(careers);
        }

        [When(@"User scrolls down to the end of the page")]
        public void UserScrollsDownToTheEndOfThePage()
        {
            _page.Keyboard.DownAsync("End").GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' website is opened in popup window")]
        public void ThenWebsiteIsOpenedInPopupWindow(string website)
        {
            var popup = _page.WaitForPopupAsync().GetAwaiter().GetResult();
            popup.Url.Should().Contain(website.ToLower());
        }
    }
}