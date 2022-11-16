using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Providers;
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

        public GeneralSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
            _browserFactory = browserFactory;
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
            var objectList = table.Rows.ToDictionary(r => r["Type"], r => r["Name"]);

            while (true)
            {
                try
                {
                    foreach (var type in objectList)
                    {
                        switch (type.Key)
                        {
                            case "Tag":
                                var element = _page.Component<Tag>(type.Value);
                                var count = element.CountAsync().Result;
                                count.Should().NotBe(0);
                                break;
                            case "Vacancy":
                                var state2 = _page.Component<Card>(type.Value).CountAsync().Result;
                                state2.Should().NotBe(0);
                                break;
                        }
                    }
                    break;
                }
                catch (Exception e)
                {
                    _page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
                }
            }
        }
    }
}
