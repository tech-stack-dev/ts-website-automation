using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Pages;
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
        private readonly IPage _page;

        public JobPageSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [Then(@"'([^']*)' job title is displayed on job page")]
        public void ThenJobTitleIsDisplayedOnJobPage(string expectedJobTitle)
        {
            var actualJobTitle = _page.Init<JobPage>().Title.TextContentAsync().GetAwaiter().GetResult();
            actualJobTitle.Should().Be(expectedJobTitle);
        }

        [Then(@"Tags are displayed on job page")]
        public void ThenTagsAreDisplayedOnJobPage(Table table)
        {
            var expectedListTags = table.Rows.SelectMany(x => x.Values).ToList();

            var actualListTags = _page.Init<JobPage>().Tags.ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult());

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
            var tags = _page.Init<JobPage>().Tags.ElementHandlesAsync().GetAwaiter().GetResult();

            if (!tags.Any())
            {
                throw new Exception("Job page has not any job tags");
            }

            var actualTag = tags.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(expectedTag));
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

            var actualBlockTitles = _page.Init<JobPage>().BlockTitles
                .ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult());

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
            var actualListTabs = _page.Component<NavigationTabs>(new Properties { ParentSelector = WebContainer.GetLocator(container)})
                .ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult());
            actualListTabs.Should().Equal(expectedListTabs);
        }
    }
}
