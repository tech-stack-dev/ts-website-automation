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
        public async void GivenUserIsOnCareerWebsite()
        {
            _page = _browserFactory
                .OpenNewPage(UrlProvider.Application)
                .GetAwaiter()
                .GetResult();
        }

        [Given(@"User is on '([^']*)' page")]
        public async void GivenUserIsOnPage(string url)
        {
            _page = _browserFactory
                .OpenNewPage(url)
                .GetAwaiter()
                .GetResult();
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

        [When(@"User waits careers with default descriptions and tags")]
        public void WhenUserWaitsCareersWithDefaultDescriptionsAndTags()
        {
            var careers = _defaultCareersList.Value;
            _page.Init<CareerMainPage>().WaitForRandomCareers(careers);
        }
    }
}
