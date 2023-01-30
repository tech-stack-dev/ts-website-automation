using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
using System.Threading;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class GeneralSteps : SpecFlowContext
    {
        private readonly BrowserFactory _browserFactory;
        private IPage _page;
        private readonly DefaultCareersList _defaultCareersList;

        public GeneralSteps(BrowserFactory browserFactory, DefaultCareersList defaultCareersList)
        {
            _page = browserFactory.Page;
            _browserFactory = browserFactory;
            _defaultCareersList = defaultCareersList;
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

        [When(@"User click back button in the browser")]
        public void WhenUserClickBackButtonInTheBrowser()
        {
            _page.GoBackAsync().GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(state: LoadState.Load);
        }

        [Then(@"'(.*)' page is opened in browser")]
        public void ThenPageOpenedInBrowser(string url)
        {
            _page.Url.Should().BeEquivalentTo(url);
        }

        [Then(@"'([^']*)' website is opened in popup window")]
        public void ThenWebsiteIsOpenedInPopupWindow(string website)
        {
            var popup = _page.WaitForPopupAsync().GetAwaiter().GetResult();
            popup.Url.Should().Contain(website.ToLower());
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
            var careers = _defaultCareersList.Value;
            _page.Init<CareerMainPage>().WaitForMockedCareers(careers);
        }
    }
}
