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
            var objectList = table.Rows.ToDictionary(r => r["Name"], r => r["Type"]);
            int iterator = 0;

            while (iterator < 4)
            {
                try
                {
                    foreach (var type in objectList)
                    {
                        switch (type.Value)
                        {
                            case "Tag":
                                var tagElement = _page.Component<Tag>(type.Key);
                                var tagCount = tagElement.CountAsync().Result;
                                tagCount.Should().NotBe(0);
                                objectList.Remove(type.Key);
                                continue;
                            case "Vacancy":
                                var vacancyElement = _page.Component<Card>(type.Key);
                                var vacancyCount = vacancyElement.CountAsync().Result;
                                vacancyCount.Should().NotBe(0);
                                objectList.Remove(type.Key);
                                continue;
                        }
                    }
                    break;
                }
                catch (Exception)
                {
                    _page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
                    iterator++;
                }
            }
        }
    }
}
