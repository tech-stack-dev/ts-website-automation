using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using PlaywrightAutomation.Utils.Waiters;
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
        private readonly CustomWaiter _customWaiter;

        public GeneralSteps(BrowserFactory browserFactory, DefaultCareersList defaultCareersList, CustomWaiter customWaiter)
        {
            _page = browserFactory.Page;
            _browserFactory = browserFactory;
            _defaultCareersList = defaultCareersList;
            _customWaiter = customWaiter;
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

        [When(@"User expects objects to be created")]
        public void WhenUserExpectsObjectsToBeCreated(Table table)
        {
            var objectList = table.Rows.ToDictionary(r => r["Name"], r => r["Type"]);

            foreach (var type in objectList)
            {
                switch (type.Value)
                {
                    case "Tag":
                        var tagElement = _page.Component<Tag>(type.Key);
                        _customWaiter.WaiterWithReloadPage(_page, tagElement);
                        objectList.Remove(type.Key);
                        continue;
                    case "Vacancy":
                        var vacancyElement = _page.Component<Card>(type.Key);
                        _customWaiter.WaiterWithReloadPage(_page, vacancyElement);
                        objectList.Remove(type.Key);
                        continue;
                }
            }
        }

        [When(@"User waits careers with default descriptions and tags")]
        public void WhenUserWaitsCareersWithDefaultDescriptionsAndTags()
        {
            var careers = _defaultCareersList.Value;
            _customWaiter.WaiterDefaultCareers(_page, careers);
        }
    }
}
