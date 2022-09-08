using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.UnitTests;
using PlaywrightAutomation.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        [Then(@"'([^']*)' tag is displayed on job page")]
        public void ThenTagIsDisplayedOnJobPage(string expectedTag)
        {
            var tags = _page.Init<JobPage>().Tags.ElementHandlesAsync().GetAwaiter().GetResult();

            if (!tags.Any())
            {
                throw new Exception("Job page has not any job tags");
            }

            var actualTag = tags.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(expectedTag))
               .IsVisibleAsync().GetAwaiter().GetResult();

            actualTag.Should().BeTrue();
        }

        [Then(@"'([^']*)' tag is displayed in the '([^']*)' position on job page")]
        public void ThenTagIsDisplayedInThePositionOnJobPage(string expectedTag, string expectedPosition)
        {
            var tags = _page.Init<JobPage>().Tags.ElementHandlesAsync().GetAwaiter().GetResult().ToList();

            if (!tags.Any())
            {
                throw new Exception("Job page has not any job tags");
            }

            var actualTag = tags.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(expectedTag));

            var actualPosition = tags.IndexOf(actualTag);
            actualPosition.Should().Be(int.Parse(expectedPosition) - 1);
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

        [Then("Social media icons are displayed below job title on job page")]
        public void ThenSocialMediaIconsAreDisplayedBelowJobTitleOnJobPage()
        {
            var socialIcons = _page.Init<JobPage>().SocialIcons.IsVisibleAsync().GetAwaiter().GetResult();
            socialIcons.Should().BeTrue();
        }

        [Then("'([^']*)' social media icon is clickable on job page")]
        public void ThenSocialMediaIconIsClickableOnJobPage(string icon)
        {
            var socialIcons = _page.Init<JobPage>().SocialIcons.ElementHandlesAsync().GetAwaiter().GetResult();

            if (!socialIcons.Any())
            {
                throw new Exception("Job page has not any job tags");
            }

            var socialIcon = socialIcons.FirstOrDefault(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(icon));
            socialIcon.ClickAsync();
        }

        [Then("Job has description titles on job page")]
        public void ThenJobHasDescriptionTitlesOnJobPage(Table table)
        {
            var expectedDescriptionTitles = table.Rows.SelectMany(x => x.Values).ToList();

            var actualDescriptionTitles = _page.Init<JobPage>().JobDescriptionTitles
                .ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult());

            actualDescriptionTitles.Should().Contain(expectedDescriptionTitles);
        }
    }
}
