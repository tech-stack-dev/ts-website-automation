using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.PageSteps
{
    [Binding]
    internal class JobPageSteps : SpecFlowContext
    {
        private const string URL_SEARCH = "{0}?searchValue={1}";

        private readonly IPage _page;
        private readonly SessionRandomValue _sessionRandom;
        private readonly CreatedTags _createdTags;
        private readonly CreatedCareer _createdCareer;

        public JobPageSteps(BrowserFactory browserFactory, SessionRandomValue sessionRandom, CreatedTags createdTags, CreatedCareer createdCareer)
        {
            _page = browserFactory.Page;
            _sessionRandom = sessionRandom;
            _createdTags = createdTags;
            _createdCareer = createdCareer;
        }

        [When(@"User expects tags and careers on the page")]
        public void WhenUserExpectsTagsAndCareersOnThePage()
        {
            WaitForTagsCreating();
            foreach (var career in _createdCareer.Value)
            {
                // Application URL used to guarantee page reload and search results
                _page.GotoAsync(string.Format(URL_SEARCH, UrlProvider.Application, career.NameUs)).GetAwaiter().GetResult();
                WaitForCareerCreating(career);
            }
        }

        [Then(@"'([^']*)' job title is displayed on job page")]
        public void ThenJobTitleIsDisplayedOnJobPage(string expectedJobTitle)
        {
            _page.ExecuteFunc(() =>
            {
                var actualJobTitle = _page.Init<JobPage>().Title.TextContentAsync().GetAwaiter().GetResult();
                actualJobTitle.Should().Be(expectedJobTitle.AddRandom(_sessionRandom));
                _page.ReloadAsync().GetAwaiter().GetResult();
            }, PageExtensions.AmountOfTime.Medium);
        }

        [Then(@"Tags are displayed on job page")]
        public void ThenTagsAreDisplayedOnJobPage(Table table)
        {
            var expectedListTags = table.Rows.SelectMany(x => x.Values).ToList().Select(x => x.AddRandom(_sessionRandom));
            var actualListTags = _page.Init<JobPage>().Tags.AllInnerTextsAsync().GetAwaiter().GetResult();

            actualListTags.Should().Equal(expectedListTags);
        }

        [Then(@"'([^']*)' tag is displayed in '([^']*)' position on job page")]
        public void ThenTagIsDisplayedInPositionOnJobPage(string expectedTag, int expectedPosition)
        {
            var tags = _page.Init<JobPage>().Tags.ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            if (!tags.Any())
            {
                throw new Exception("Job page has not any job tags");
            }

            var actualTag = tags.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(expectedTag));

            var actualPosition = tags.IndexOf(actualTag);
            actualPosition.Should().Be(expectedPosition - 1);
        }

        [Then(@"'([^']*)' tag has '([^']*)' background color on job page")]
        public void ThenTagHasBackgroundColorOnJobPage(string expectedTag, string expectedColor)
        {
            var tags = _page.Init<JobPage>().Tags;

            if (tags.CountAsync().Result.Equals(0))
            {
                throw new Exception("Job page has not any job tags");
            }

            var actualTag = tags.GetByText(expectedTag);

            actualTag.GetBackgroundColor().Should().Be(ColorsConvertor.Converter(expectedColor));
        }

        [Then(@"'([^']*)' text is displayed with social media icons on job page")]
        public void ThenTextIsDisplayedWithSocialMediaIconsOnJobPage(string expectedText)
        {
            var actualText = _page.Init<JobPage>().SocialIconsText.TextContentAsync().GetAwaiter().GetResult();
            actualText.Should().Be(expectedText);
        }

        [Then(@"Social media icons are displayed below job title on job page")]
        public void ThenSocialMediaIconsAreDisplayedBelowJobTitleOnJobPage()
        {
            var socialIcons = _page.Init<JobPage>().SocialIcons.IsVisibleAsync().GetAwaiter().GetResult();
            socialIcons.Should().BeTrue();
        }

        [Then(@"Following block titles are displayed on job page")]
        public void ThenFollowingBlockTitlesAreDisplayedOnJobPage(Table table)
        {
            var expectedBlockTitles = table.Rows.SelectMany(x => x.Values).ToList();
            var actualBlockTitles = _page.Init<JobPage>().BlockTitles.AllInnerTextsAsync().GetAwaiter().GetResult();

            actualBlockTitles.Should().Equal(expectedBlockTitles);
        }

        [Then(@"'([^']*)' text is displayed on Apply Container on job page")]
        public void ThenTextIsDisplayedOnApplyContainerOnJobPage(string expectedText)
        {
            var actualText = _page.Init<JobPage>().ApplyContainer.InnerTextAsync().GetAwaiter().GetResult();
            actualText.Should().Contain(expectedText);
        }

        [Then(@"Techstack logo is displayed on job page")]
        public void ThenTechstackLogoIsDisplayedOnJobPage()
        {
            var logo = _page.Init<NavigationHeader>().Logo;
            var logoState = logo.IsVisibleAsync().GetAwaiter().GetResult();
            logoState.Should().BeTrue();
            var logoAttribute = logo.GetAttributeAsync("alt").GetAwaiter().GetResult();
            logoAttribute.Should().BeEquivalentTo("Techstack");
        }

        [Then(@"Jobs block on '([^']*)' container on job page has tabs")]
        public void ThenJobsBlockOnContainerOnJobPageHasTabs(string container, Table table)
        {
            var expectedListTabs = table.Rows.SelectMany(x => x.Values).ToList();
            var actualListTabs = _page.Component<NavigationTabs>(new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .AllInnerTextsAsync().GetAwaiter().GetResult();

            actualListTabs.Should().Equal(expectedListTabs);
        }

        public void WaitForTagsCreating()
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
        }

        public void WaitForCareerCreating(Career career)
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