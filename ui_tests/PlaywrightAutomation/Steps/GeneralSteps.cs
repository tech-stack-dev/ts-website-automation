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
        private readonly BrowserFactory _browserFactory;
        private IPage _page;
        private readonly CreatedTags _createdTags;
        private readonly CreatedCareer _createdCareer;

        public GeneralSteps(BrowserFactory browserFactory, CreatedTags createdTags, CreatedCareer createdCareer)
        {
            _page = browserFactory.Page;
            _browserFactory = browserFactory;
            _createdTags = createdTags;
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
            var careers = _createdCareer.Value.Select(x=>x.NameUs).ToList();
            _page.Init<CareerMainPage>().WaitForMockedCareers(careers);
        }


        [When(@"User expects tags and careers on the page")]
        public void WhenUserExpectsTagsAndCareersOnThePage()
        {
            foreach (var tag in _createdTags.Value)
            {
                try
                {
                    tag.Name = tag.Name.Split("_").ToList().First();
                    var tagElement = _page.Component<Tag>(tag.Name);
                    _page.WaiterWithReloadPage(tagElement);
                    tagElement.Count().Should().NotBe(0);
                }
                catch
                {
                    throw new Exception($"'{tag.Prefix}' element with '{tag.Name}' name is not displayed");
                }
            }

            foreach (var career in _createdCareer.Value)
            {
                try
                {
                    var careerElement = _page.Component<Card>(career.NameUs);
                    _page.WaiterWithReloadPage(careerElement);
                    careerElement.Count().Should().NotBe(0);
                }
                catch
                {
                    throw new Exception($"'{career.NameUs}' career is not displayed");
                }
            }
        }
    }
}