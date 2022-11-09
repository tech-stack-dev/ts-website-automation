using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.Button;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages.OurServices.ConsultingService;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.Utils;
using System;
using System.Web;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.PageSteps.OurServices.ConsultingService
{
    [Binding]
    internal class ConsultingServiceSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public ConsultingServiceSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User clicks on '([^']*)' element in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action are correct")]
        public void WhenUserClicksOnAndSeesEventCategoryAndEventActionAreCorrect(string element, string container, string eventCategory, string eventAction)
        {
            var request = _page.RunAndWaitForRequestAsync(async () =>
            {
                switch (element)
                {
                    case "BreadCrumbsPrev":
                        _page.Init<ConsultingServiceTopPage>().BreadCrumbsPrev.ClickAsync().GetAwaiter().GetResult();
                        break;
                    case "RequestAQuoteButton":
                        ClickOnRequestAQuoteButton(container);
                        break;
                    case "RightTimelineControl":
                        ClickOnTimeline("right");
                        break;
                    case "LeftTimelineControl":
                        ClickOnTimeline("left");
                        break;
                    case "Arrow":
                        ClickOnLinkArrow(container);
                        break;
                    case "SendMessage":
                        _page.Init<GetInTouchPage>().SendMessageButton.ClickAsync().GetAwaiter().GetResult();
                        break;
                    case "AttachFile":
                        _page.Init<GetInTouchPage>().AttachFiles.ClickAsync().GetAwaiter().GetResult();
                        break;
                    case "DeleteAttachedFile":
                        _page.Init<GetInTouchPage>().DeleteFile.ClickAsync().GetAwaiter().GetResult();
                        break;
                }
            }, x => x.Url.Contains("www.google-analytics.com")).Result;

            var returnData = HttpUtility.UrlDecode(request.Url);
            returnData.Should().Contain($"ec={eventCategory}");
            returnData.Should().Contain($"ea={eventAction}");
        }

        [When(@"User clicks on SendMessage element and sees '([^']*)' event category and '([^']*)' event action are correct")]
        public void WhenUserClicksOnSendMessageElementAndSeesEventCategoryAndEventActionAreCorrect(string eventCategory, string eventAction)
        {

            var request = _page.RunAndWaitForResponseAsync(async () =>
            {
                _page.Init<GetInTouchPage>().SendMessageButton.ClickAsync().GetAwaiter().GetResult();
                _page.Locator("//div[@class='msg']").Nth(1).IsVisibleAsync().GetAwaiter().GetResult();
            }, x => x.Url.Contains("www.google-analytics.com") && x.Url.Contains($"ea={eventAction}")).Result;

            var returnData = HttpUtility.UrlDecode(request.Url);
            returnData.Should().Contain($"ec={eventCategory}");
            returnData.Should().Contain($"ea={eventAction}");
        }

        [When(@"User clicks on members '([^']*)' link and sees '([^']*)' event category and '([^']*)' event action are correct")]
        public void WhenUserClicksOnMembersLinkAndSeesEventCategoryAndEventActionAreCorrect(string link, string eventCategory, string eventAction)
        {
            ILocator members;

            switch (link)
            {
                case "LinkedIn":
                    members = _page.Init<ConsultingExpertsPage>().MemberLinkedInLink;
                    break;
                case "Blog":
                    members = _page.Init<ConsultingExpertsPage>().MemberBlogLink;
                    break;
                default:
                    throw new Exception("Not found link");
            }

            var count = members.CountAsync().GetAwaiter().GetResult();

            for (int i = 0; i < count; i++)
            {
                var memberNames = members.Nth(i).Locator(_page.Init<ConsultingExpertsPage>().MemberName)
                    .InnerTextAsync().GetAwaiter().GetResult();
                var request = _page.RunAndWaitForRequestAsync(async () =>
                {
                    members.Nth(i).ClickAsync().GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();

                }, x => x.Url.Contains("www.google-analytics.com")).Result;

                var returnData = HttpUtility.UrlDecode(request.Url);
                returnData.Should().Contain($"ec={eventCategory}");
                returnData.Should().Contain($"ea={eventAction}-{memberNames.Replace(" ", "-")}");
            }
        }

        [When(@"User clicks on '([^']*)' link in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action are correct")]
        public void WhenUserClicksOnLinkInContainerAndSeesEventCategoryAndEventActionAreCorrect(string linkName, string container, string eventCategory, string eventAction)
        {
            var blockName = _page.Init<RelatedServicesSection>().ContentBlock(container)
                .Locator(_page.Init<RelatedServicesSection>().BlockNames).InnerTextAsync().GetAwaiter().GetResult();

            var request = _page.RunAndWaitForRequestAsync(async () =>
            {
                var parent = _page.Init<RelatedServicesSection>().ContentBlock(container);
                _page.Component<Link>(new Properties { Parent = parent })
                    .ClickAsync().GetAwaiter().GetResult();
            }, x => x.Url.Contains("www.google-analytics.com")).Result;

            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
            var returnData = HttpUtility.UrlDecode(request.Url);
            returnData.Should().Contain($"ec={eventCategory}");
            returnData.Should().Contain($"ea={eventAction}-{blockName.Replace(" ", "-")}");
        }

        [When(@"User clicks on collapse arrows and sees '([^']*)' event category and '([^']*)' event action are correct")]
        public void WhenUserClicksOnCollapseArrowsAndSeesEventCategoryAndEventActionAreCorrect(string eventCategory, string eventAction)
        {
            var collapseArrows = _page.Init<ConsultingFaqSectionPage>().CollapseArrow;
            var count = collapseArrows.CountAsync().GetAwaiter().GetResult();

            for (int i = 0; i < count; i++)
            {
                var request = _page.RunAndWaitForRequestAsync(async () =>
                {
                    collapseArrows.Nth(i).ClickAsync().GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();

                }, x => x.Url.Contains("www.google-analytics.com")).Result;

                var returnData = HttpUtility.UrlDecode(request.Url);
                returnData.Should().Contain($"ec={eventCategory}");
                returnData.Should().Contain($"ea={eventAction}{i + 1}More");
            }
        }

        [When(@"User clicks on related articles and sees '([^']*)' event category and '([^']*)' event action are correct")]
        public void WhenUserClicksOnRelatedArticlesAndSeesEventCategoryAndEventActionAreCorrect(string eventCategory, string eventAction)
        {
            var articles = _page.Init<RelatedArticlesSectionPage>().RelatedArticles;

            for (int i = 0; i < 3; i++)
            {
                var title = articles.Nth(i).Locator(_page.Init<RelatedArticlesSectionPage>().Title).InnerTextAsync()
                    .GetAwaiter().GetResult();
                var request = _page.RunAndWaitForRequestAsync(async () =>
                {
                    articles.Nth(i).ClickAsync().GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();

                }, x => x.Url.Contains("www.google-analytics.com")).Result;

                _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
                var returnData = HttpUtility.UrlDecode(request.Url);
                returnData.Should().Contain($"ec={eventCategory}");
                returnData.Should().Contain($"ea={eventAction}-{title.Replace(" ", "-")}");
            }
        }

        [When(@"User enters '([^']*)' in '([^']*)' input in Get In Touch form")]
        public void WhenUserEntersInInputInGetInTouchForm(string text, string inputName)
        {
            ILocator input;

            switch (inputName)
            {
                case "First name":
                    input = _page.Init<GetInTouchPage>().FirstNameInput;
                    break;
                case "Last name":
                    input = _page.Init<GetInTouchPage>().LastNameInput;
                    break;
                case "Email":
                    input = _page.Init<GetInTouchPage>().EmailInput;
                    break;
                default:
                    throw new Exception("Not found input");
            }

            input.FillAsync(text).GetAwaiter().GetResult();
        }

        [When(@"User attach '([^']*)' file in Get In Touch form")]
        public void WhenUserAttachFileInGetInTouchFormAndSeesEventCategoryAndEventActionAreCorrect(string file)
        {
            var filePath = $"{PathProvider.ResourcesFolder}/{file}";
            _page.Init<GetInTouchPage>().AttachFiles.SetInputFilesAsync(filePath).GetAwaiter().GetResult();
        }

        public void ClickOnRequestAQuoteButton(string container)
        {
            _page.Component<RequestAQuoteButton>(new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .ClickAsync().GetAwaiter().GetResult();
        }

        public void ClickOnLinkArrow(string container)
        {
            _page.Component<Link>(new Properties { ParentSelector = WebContainer.GetLocator(container) })
                .ClickAsync().GetAwaiter().GetResult();
        }

        public void ClickOnTimeline(string side)
        {
            switch (side)
            {
                case "right":
                    _page.Init<ConsultingProcessSectionPage>().RightActiveTimeline.ClickAsync().GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
                    break;
                case "left":
                    _page.Init<ConsultingProcessSectionPage>().LeftActiveTimeline.ClickAsync().GetAwaiter().GetResult();
                    break;
                default:
                    throw new Exception("Side is not found");
            }
        }
    }
}
