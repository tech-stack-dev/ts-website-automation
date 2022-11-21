using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
using ChoETL;
using PlaywrightAutomation.RuntimeVariables;
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

        [When(@"User waits careers with default descriptions and tags")]
        public void WhenUserWaitsCareersWithDefaultDescriptionsAndTags()
        {
            var careers = _defaultCareersList.Value;
            
            //restart:
            foreach (var defaultCareer in careers)
            {
                restart:
                var pascalCaseName = defaultCareer.ConvertToPascalCase();
                var countCareer = _page.Component<Card>(pascalCaseName).CountAsync().Result;
                
                var pagination = _page.Component<Pagination>();
                //pagination.HoverAsync().GetAwaiter().GetResult();
                //var paginationDirectionVisibleState = pagination.ArrowButtonByDirection("right").IsVisibleAsync().GetAwaiter().GetResult();

                if (countCareer == 0 && pagination.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    pagination.HoverAsync().GetAwaiter().GetResult();

                    //paginationDirectionVisibleState.Should().BeTrue();
                    pagination.ArrowButtonByDirection("right").ClickAsync().GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
                    goto restart;
                }

                if (countCareer == 0 && !pagination.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    _page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
                    goto restart;
                }

                if (pagination.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    pagination.FirstPage.ClickAsync().GetAwaiter().GetResult();
                }
            }



            //for (int i = 0; i < 4; i++)
            //{
            //    try
            //    {
            //        foreach (var career in careers)
            //        {
            //            var element = _page.Component<Card>(career);
            //            var count = element.CountAsync().GetAwaiter().GetResult();
            //            if (count == 0)
            //            {
            //                var pagination = _page.Component<Pagination>();
            //                pagination.HoverAsync().GetAwaiter().GetResult();
            //                var paginationDirectionVisibleState = pagination.ArrowButtonByDirection("right").IsVisibleAsync().GetAwaiter().GetResult();
            //                paginationDirectionVisibleState.Should().BeTrue();
            //                pagination.ArrowButtonByDirection("right").ClickAsync().GetAwaiter().GetResult();
            //                _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
            //            }
            //            count.Should().NotBe(0);
            //            careers.Remove(career);
            //        }
            //        break;
            //    }
            //    catch (Exception)
            //    {
            //        var pagination = _page.Component<Pagination>();
            //        pagination.HoverAsync().GetAwaiter().GetResult();
            //        var paginationDirectionVisibleState = pagination.ArrowButtonByDirection("right").IsVisibleAsync().GetAwaiter().GetResult();
            //        if (paginationDirectionVisibleState)
            //        {
            //            paginationDirectionVisibleState.Should().BeTrue();
            //            pagination.ArrowButtonByDirection("right").ClickAsync().GetAwaiter().GetResult();
            //            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
            //        }
            //        paginationDirectionVisibleState.Should().BeTrue();
            //        pagination.ArrowButtonByDirection("right").ClickAsync().GetAwaiter().GetResult();
            //        _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();

            //        _page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
            //    }
            //}
        }
    }
}
