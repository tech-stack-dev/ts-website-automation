using AutomationUtils.Extensions;
using ChoETL;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.Button;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages.AboutUs;
using PlaywrightAutomation.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class AboutUsSteps : SpecFlowContext
    {
        private readonly IPage _page;
        public AboutUsSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [Then(@"Title is equals '([^']*)' on '([^']*)' container")]
        public void ThenTitleIsEqualsOnContainer(string titleText, string container)
        {
            var parent = WebContainer.GetLocator(container);
            var title = _page.Init<AboutUsPage>().Title;
            var actualTitleText = _page.Locator(parent).Locator(title).InnerTextAsync().GetAwaiter().GetResult();
            actualTitleText.Should().Be(titleText);
        }

        [Then(@"Description is equals '([^']*)' on '([^']*)' container")]
        public void ThenDescriptionIsEqualsOnContainer(string descriptionText, string container)
        {
            var parent = WebContainer.GetLocator(container);
            var description = _page.Init<AboutUsPage>().Description;
            var actualDescriptionText =
                _page.Locator(parent).Locator(description).InnerTextAsync().GetAwaiter().GetResult();
            actualDescriptionText.Should().Be(descriptionText);
        }

        [Then(@"Section title is equals '([^']*)'")]
        public void ThenSectionTitleIsEquals(string title)
        {
            var sectionTitle = _page.Init<OurHistoryPage>().Title.InnerTextAsync().GetAwaiter().GetResult();
            sectionTitle.Should().Be(title);
        }

        [When(@"User clicks on '([^']*)' next control button on '([^']*)' container")]
        public void WhenUserClicksOnNextControlButtonOnContainer(string next, string container)
        {
            string parent = WebContainer.GetLocator(container);
            string blocksInCarousel = _page.Init<AboutUsPage>().NumberInCarousel;
            var nextButton = _page.Component<Button>(next, new BaseWebComponent
                .Properties{ParentSelector = WebContainer.GetLocator(container)});
            for (int i = 0; i < (_page.Locator(parent).Locator(blocksInCarousel).CountAsync().GetAwaiter().GetResult()); i++)
            {
                if (i < (_page.Locator(parent).Locator(blocksInCarousel).CountAsync().GetAwaiter().GetResult()) - 1)
                {
                    var activeStatus = _page.Component<Button>(next, new BaseWebComponent.Properties
                    { ParentSelector = WebContainer.GetLocator(container) })
                       .GetAttributeAsync("class").Result.Contains("iGrotq");
                    activeStatus.Should().BeTrue();
                    nextButton.ClickAsync().GetAwaiter().GetResult();
                }
                else
                {
                    var disableStatus = _page.Component<Button>(next, new BaseWebComponent.Properties
                    { ParentSelector = WebContainer.GetLocator(container) })
                         .GetAttributeAsync("class").Result.Contains("eMBQoo");
                    disableStatus.Should().BeTrue();
                }
            }
        }

        [When(@"User clicks on '([^']*)' prev control button on '([^']*)' container")]
        public void WhenUserClicksOnPrevControlButtonOnContainer(string prev, string container)
        {
            string parent = WebContainer.GetLocator(container);
            string blocksInCarousel = _page.Init<AboutUsPage>().NumberInCarousel;
            for (int i = _page.Locator(parent).Locator(blocksInCarousel).CountAsync().GetAwaiter().GetResult() - 1; i >= 0; i--)
            {
                if (i > 0)
                {
                    var prevButton = _page.Component<Button>(prev, new BaseWebComponent
                        .Properties{ParentSelector = WebContainer.GetLocator(container)});
                    var activeStatus = prevButton
                        .GetAttributeAsync("class").Result.Contains("iGrotq");
                    activeStatus.Should().BeTrue();
                    _page.Component<Button>(prev, new BaseWebComponent.Properties { ParentSelector = parent })
                        .ClickAsync().GetAwaiter().GetResult();
                }
                else
                {
                    var disableStatus = _page.Component<Button>(prev, new BaseWebComponent.Properties
                    { ParentSelector = WebContainer.GetLocator(container) })
                        .GetAttributeAsync("class").Result.Contains("eMBQoo");
                    disableStatus.Should().BeTrue();
                }
            }
        }

        [Then(@"Content in the '([^']*)' carousel block on '([^']*)' container is displayed")]
        public void ThenContentInTheCarouselBlockOnContainerIsDisplayed(string blockName, string container, Table table)
        {

            var parent = WebContainer.GetLocator(container);
            var numberInCarousel = _page.Init<AboutUsPage>().NumberInCarousel;
            var titleInCarousel = _page.Init<AboutUsPage>().TitleInCarousel;
            var descriptionInCarousel = _page.Init<AboutUsPage>().DescriptionInCarousel;
            var valuesInTable = table.CreateSet<(string columnNumber, string columnTitle, string columnDescription)>();
            var actualNumber = _page.Locator(parent).Locator(numberInCarousel).ElementHandlesAsync().GetAwaiter()
                .GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            var actualTitle = _page.Locator(parent).Locator(titleInCarousel).ElementHandlesAsync()
                .GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            var actualDescription = _page.Locator(parent).Locator(descriptionInCarousel).ElementHandlesAsync()
                .GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult().RemoveLineBreaks().RemoveExtraSpaces()).ToList();
            actualNumber.Should().BeEquivalentTo(valuesInTable.Select(x => x.columnNumber).ToList());
            actualTitle.Should().BeEquivalentTo(valuesInTable.Select(x => x.columnTitle).ToList());
            actualDescription.Should().BeEquivalentTo(valuesInTable.Select(x => x.columnDescription).ToList());
        }

        [When(@"User scrolls down the page on '([^']*)' container")]
        public void WhenUserScrollsDownThePageOnContainer(string container)
        {
            var scrollDown = _page.HoverAsync(_page.Init<AboutUsPage>().FooterBlock);
        }

        [Then(@"User sees the first element on '([^']*)' container when scrolling up to this block")]
        public void ThenUserSeesTheFirstElementOnContainerWhenScrollingUpToThisBlock(string container)
        {
            var parent = WebContainer.GetLocator(container);
            var firstElement = _page.Init<AboutUsPage>().FirstElCarousel;
            var getFirstElement = _page.Locator(parent).Locator(firstElement).GetAttributeAsync("class").Result
                .Contains("kSncrs");
            getFirstElement.Should().BeTrue();
        }

        [Then(@"Our achivements are correctly displayed")]
        public void ThenOurAchivementsAreCorrectlyDisplayed(Table table)
        {
            var values = table.CreateSet<(string Fields, string Values)>();
            var achievements = _page.Init<OurAchievementsPage>();
            var title = achievements.Title.ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            var description = achievements.Description.ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            title.Should().BeEquivalentTo(values.Select(x => x.Fields).ToList());
            description.Should().BeEquivalentTo(values.Select(x => x.Values).ToList());
        }

        [Then(@"Top block title is equals '([^']*)'")]
        public void ThenTopBlockTitleIsEquals(string titleText)
        {
            var topBlockTitle = _page.Init<TechstackInGrowthPage>().TopBlockTitle
                .InnerTextAsync().GetAwaiter().GetResult();
            topBlockTitle.Should().Be(titleText);
        }

        [Then(@"Main block titles are displayed")]
        public void ThenMainBlockTitlesAreDisplayed(Table table)
        {
            var tableValues = table.Rows.SelectMany(x => x.Values).ToList();
            var title = _page.Init<TechstackInGrowthPage>();
            var mainBlockTitle = title.MainBlockTitles.ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            mainBlockTitle.Should().BeEquivalentTo(tableValues);
        }

        [Then(@"Description of techstack roles is equals '([^']*)'")]
        public void ThenDescriptionOfTechstackRolesIsEquals(string paragraphDescription)
        {
            var descriptionText = _page.Init<TechstackRolesPage>().ParagraphDescription
                .InnerTextAsync().GetAwaiter().GetResult();
            descriptionText.Should().Be(paragraphDescription);
        }

        [Then(@"Content in the '([^']*)' block on '([^']*)' container is displayed")]
        public void ThenContentInTheBlockOnContainerIsDisplayed(string blockName, string container, Table table)
        {
            var parent = WebContainer.GetLocator(container);
            var blockTitle = _page.Init<AboutUsPage>().BlockTitle;
            var textDescription = _page.Init<AboutUsPage>().TextDescription;
            var values = table.CreateSet<(string blockTitles, string textDescriptions)>();
            var actualBlockTitle = _page.Locator(parent).Locator(blockTitle).ElementHandlesAsync().GetAwaiter()
                .GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            var actualTextDescription = _page.Locator(parent).Locator(textDescription).ElementHandlesAsync()
                .GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            actualBlockTitle.Should().BeEquivalentTo(values.Select(x => x.blockTitles).ToList());
            actualTextDescription.Should().BeEquivalentTo(values.Select(x => x.textDescriptions).ToList());
        }

        [Then(@"Image in the '([^']*)' block on '([^']*)' container is displayed")]
        public void ThenImageInTheBlockOnContainerIsDisplayed(string blockTitles, string container, Table table)
        {
            string parent = WebContainer.GetLocator(container);
            string images = _page.Init<AboutUsPage>().Images;
            List<string> tableUrls = table.Rows.SelectMany(x => x.Values).ToList();
            List<string> urlList = new List<string>();
            for (int i = 0; i < (_page.Locator(parent).Locator(images).CountAsync().GetAwaiter().GetResult()); i++)
            {
                var attributeValue = _page.Locator(parent).Locator(images).Nth(i).ElementHandleAsync().Result
                    .GetAttributeAsync("src").Result.ToString();
                urlList.Add(attributeValue);
            }
            urlList.Should().BeEquivalentTo(tableUrls);
        }

        [When(@"User clicks on '([^']*)' next button on '([^']*)' container")]
        public void ThenUserClicksOnNextButtonOnContainer(string carouselNext, string container)
        {
            string parent = WebContainer.GetLocator(container);
            string images = _page.Init<AboutUsPage>().Images;
            for (int i = 0; i < (_page.Locator(parent).Locator(images).CountAsync().GetAwaiter().GetResult()); i++)
            {
                if (i < (_page.Locator(parent).Locator(images).CountAsync().GetAwaiter().GetResult()) - 1)
                {
                    var activeStatus = _page.Component<Button>(carouselNext, new BaseWebComponent.Properties
                    { ParentSelector = WebContainer.GetLocator(container) })
                        .GetAttributeAsync("class").Result.Contains("iGrotq");
                    activeStatus.Should().BeTrue();
                    _page.Component<Button>(carouselNext, new BaseWebComponent.Properties { ParentSelector = parent })
                        .ClickAsync().GetAwaiter().GetResult();
                }
                else
                {
                    var disableStatus = _page.Component<Button>(carouselNext, new BaseWebComponent.Properties
                    { ParentSelector = WebContainer.GetLocator(container) })
                          .GetAttributeAsync("class").Result.Contains("eMBQoo");
                    disableStatus.Should().BeTrue();
                }
            }
        }

        [When(@"User clicks on '([^']*)' prev button on '([^']*)' container")]
        public void ThenUserClicksOnButtonOnContainer(string carouselPrev, string container)
        {
            string parent = WebContainer.GetLocator(container);
            string images = _page.Init<AboutUsPage>().Images;
            for (int i = _page.Locator(parent).Locator(images).CountAsync().GetAwaiter().GetResult() - 1; i >= 0; i--)
            {
                if (i > 0)
                {
                    var prevButton = _page.Component<Button>(carouselPrev, new BaseWebComponent.Properties
                    { ParentSelector = WebContainer.GetLocator(container) });
                    var activeStatus = prevButton
                        .GetAttributeAsync("class").Result.Contains("iGrotq");
                    activeStatus.Should().BeTrue();
                    _page.Component<Button>(carouselPrev, new BaseWebComponent.Properties { ParentSelector = parent })
                        .ClickAsync().GetAwaiter().GetResult();
                }
                else
                {
                    var disableStatus = _page.Component<Button>(carouselPrev, new BaseWebComponent.Properties
                    { ParentSelector = WebContainer.GetLocator(container) })
                        .GetAttributeAsync("class").Result.Contains("eMBQoo");
                    disableStatus.Should().BeTrue();
                }
            }
        }

        [Then(@"Title is equals '([^']*)'")]
        public void ThenTitleIsEquals(string titleText)
        {
            var title = _page.Locator(_page.Init<ApplyTitlePage>().Container)
                .InnerTextAsync().GetAwaiter().GetResult();
            char lastSign = '?';
            int indexOfLastSign = title.IndexOf(lastSign);
            title = title.Substring(0, indexOfLastSign + 1);
            title.Should().Be(titleText);
        }

        [Then(@"Section numbers are displayed")]
        public void ThenSectionNumbersAreDisplayed(Table table)
        {
            var tableValues = table.Rows.SelectMany(x => x.Values).ToList();
            var section = _page.Init<SectionNumberPage>();
            var sectionNumbers = section.SectionNumber.ElementHandlesAsync().GetAwaiter().GetResult()
                .Select(x => x.InnerTextAsync().GetAwaiter().GetResult()).ToList();
            sectionNumbers.Should().BeEquivalentTo(tableValues);
        }
    }
}