using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.Button;
using PlaywrightAutomation.Components.Cards;
using PlaywrightAutomation.Components.Img;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages.OurServices.ConsultingService;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.Utils;
using System;
using System.Collections.Generic;
using System.Web;
using ChoETL;
using PlaywrightAutomation.Components.Inputs;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;
using PlaywrightAutomation.Components.Links;
using PlaywrightAutomation.Pages.OurServices.UxUiDesign;
using TechTalk.SpecFlow.Assist;

namespace PlaywrightAutomation.Steps.GoogleAnalyticsEvents
{
    [Binding]
    internal class ConsultingServiceSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public ConsultingServiceSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User clicks on '([^']*)' breadcrumbs in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnBreadcrumbsInContainerAndSeesEventCategoryAndEventAction(string breadcrumbsSection, string container, string eventCategory, string eventAction)
        {
            void Action()
            {
                _page.Component<Breadcrumbs>(breadcrumbsSection, new Properties { ParentSelector = WebContainer.GetLocator(container) })
                    .ClickAsync().GetAwaiter().GetResult();
            }

            RequestAction(Action, eventCategory, eventAction);
        }

        [When(@"User clicks on RequestAQuote button in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnRequestAQuoteButtonInContainerAndSeesEventCategoryAndEventAction(string container, string eventCategory, string eventAction)
        {
            void Action()
            {
                _page.Component<RequestAQuoteButton>(new Properties { ParentSelector = WebContainer.GetLocator(container) })
                    .ClickAsync().GetAwaiter().GetResult();
            }

            RequestAction(Action, eventCategory, eventAction);
        }

        [When(@"User clicks on '([^']*)' img in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnImgInContainerAndSeesEventCategoryAndEventAction(string imgName, string container, string eventCategory, string eventAction)
        {
            var imgComponent = _page.Component<Arrow>(imgName, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            for (int i = 0; i < imgComponent.CountAsync().Result; i++)
            {
                void Action()
                {
                    imgComponent.Nth(i).ClickAsync().GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
                }

                if (imgComponent.CountAsync().Result == 1)
                {
                    RequestAction(Action, eventCategory, eventAction);
                    return;
                }

                if (eventAction.Equals("QAasAServFaq"))
                {
                    RequestAction(Action, eventCategory, $"{eventAction}{i + 1}More");
                    return;
                }
                
                var expectedEventAction = eventAction + imgComponent.Nth(i).Locator(imgComponent.NameBlockWithArrow)
                    .InnerTextAsync().GetAwaiter().GetResult().Replace(" ", "-").Replace("\n", "");
                RequestAction(Action, eventCategory, expectedEventAction);
            }
        }

        [When(@"User clicks on img card in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnImgCardInContainerAndSeesEventCategoryAndEventAction(string container, string eventCategory, string eventAction)
        {
            var imtCardComponent = _page.Component<ImgCard>(new Properties
                {ParentSelector = WebContainer.GetLocator(container)});

            for (int i = 0; i < 3; i++)
            {
                void Action()
                {
                    imtCardComponent.Nth(i).ClickAsync().GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
                }

                var expectedEventAction = eventAction + "-" + imtCardComponent.Nth(i)
                    .Locator(imtCardComponent.ImgCardTitle).InnerTextAsync().GetAwaiter().GetResult().Replace(" ", "-");
                RequestAction(Action, eventCategory, expectedEventAction);
            }
        }

        [When(@"User clicks case studies in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksCaseStudiesInContainerAndSeesEventCategoryAndEventAction(string container, string eventCategory, string eventAction)
        {
            var caseComponent = _page.Component<CaseCard>(new Properties
            { ParentSelector = WebContainer.GetLocator(container) });

            for (int i = 0; i < caseComponent.CountAsync().Result; i++)
            {
                void Action()
                {
                    caseComponent.Nth(i).ClickAsync(new LocatorClickOptions{Modifiers = new KeyboardModifier[]
                        {
                            KeyboardModifier.Control
                        } }).GetAwaiter().GetResult();
                    _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
                }

                //var expectedEventAction = eventAction + caseComponent.Nth(i).Locator(caseComponent.CardName)
                //    .InnerTextAsync().GetAwaiter().GetResult().ToPascalCase().Replace("Qa", "QA");
                var expectedEventAction = eventAction + caseComponent.Nth(i).Locator(caseComponent.CardName)
                    .InnerTextAsync().GetAwaiter().GetResult().ConvertToPascalCase().Replace("Qa", "QA");
                RequestAction(Action, eventCategory, expectedEventAction);
            }
        }

        [When(@"User clicks on '([^']*)' timeline in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnTimelineInContainerAndSeesEventCategoryAndEventAction(string side, string container, string eventCategory, string eventAction)
        {
            void Action()
            {
                _page.Component<TimeLineControl>(side, new Properties { ParentSelector = WebContainer.GetLocator(container)})
                    .ClickAsync().GetAwaiter().GetResult();
                _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
            }

            var expectedEventAction = side.Equals("right") ? eventAction + "Next" : eventAction + "Prev";
            RequestAction(Action, eventCategory, expectedEventAction);
        }

        [When(@"User clicks on '([^']*)' link and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnLinkAndSeesEventCategoryAndEventAction(string link, string eventCategory, string eventAction)
        {
            void Action()
            {
                _page.Component<LinkWithId>().MemberLink(link).ClickAsync().GetAwaiter().GetResult();
            }

            RequestAction(Action, eventCategory, eventAction);
        }

        [When(@"User clicks on '([^']*)' element in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action are correct")]
        public void WhenUserClicksOnAndSeesEventCategoryAndEventActionAreCorrect(string element, string container, string eventCategory, string eventAction)
        {
            var request = _page.RunAndWaitForRequestAsync(async () =>
            {
                switch (element)
                {
                    //case "BreadCrumbsPrev":
                    //    _page.Init<ConsultingServiceTopPage>().BreadCrumbsPrev.ClickAsync().GetAwaiter().GetResult();
                    //    break;
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

        [When(@"User clicks on link with id in '([^']*)' container and wait response with '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnLinkWithIdInContainerAndWaitResponseWithEventCategoryAndEventAction(string container, string eventCategory, string eventAction)
        {
            var response = _page.RunAndWaitForResponseAsync(async () =>
            {
                _page.Component<LinkWithId>(new Properties { ParentSelector = WebContainer.GetLocator(container)})
                    .ClickAsync().GetAwaiter().GetResult();
                _page.Locator("//div[@class='msg']").Nth(1).IsVisibleAsync().GetAwaiter().GetResult();
            }, x => x.Url.Contains("www.google-analytics.com") && x.Url.Contains($"ea={eventAction}")).Result;

            var returnData = HttpUtility.UrlDecode(response.Url);
            returnData.Should().Contain($"ec={eventCategory}");
            returnData.Should().Contain($"ea={eventAction}");
        }

        [When(@"User clicks on link with id in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnLinkWithIdInContainerAndSeesEventCategoryAndEventAction(string container, string eventCategory, string eventAction)
        {
            void Action()
            {
                _page.Component<LinkWithId>(new Properties { ParentSelector = WebContainer.GetLocator(container)})
                    .ClickAsync().GetAwaiter().GetResult();
                _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
            }

            RequestAction(Action, eventCategory, eventAction);
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

        [When(@"User attach '([^']*)' file in label in '([^']*)' container")]
        public void WhenUserAttachFileInLabelInContainer(string file, string container)
        {
            var filePath = $"{PathProvider.ResourcesFolder}/{file}";
            _page.Component<Label>(new Properties { ParentSelector = WebContainer.GetLocator(container)})
                .SetInputFilesAsync(filePath).GetAwaiter().GetResult();
        }

        [When(@"User clicks on label in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnLabelInContainerAndSeesEventCategoryAndEventAction(string container, string eventCategory, string eventAction)
        {
            void Action()
            {
                _page.Component<Label>(new Properties { ParentSelector = WebContainer.GetLocator(container)})
                    .ClickAsync().GetAwaiter().GetResult();
                _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
            }

            RequestAction(Action, eventCategory, eventAction);
        }

        [When(@"User clicks on img with id in '([^']*)' container and sees '([^']*)' event category and '([^']*)' event action")]
        public void WhenUserClicksOnImgWithIdInContainerAndSeesEventCategoryAndEventAction(string container, string eventCategory, string eventAction)
        {
            void Action()
            {
                _page.Component<ImgWithId>(new Properties { ParentSelector = WebContainer.GetLocator(container)})
                    .ClickAsync().GetAwaiter().GetResult();
                _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
            }

            RequestAction(Action, eventCategory, eventAction);
        }

        [When(@"User enters '([^']*)' text in input with '([^']*)' name in '([^']*)' container")]
        public void WhenUserEntersTextInInputWithNameInContainer(string text, string input, string container)
        {
            _page.Component<InputWithName>(input, new Properties { ParentSelector = WebContainer.GetLocator(container)})
                .FillAsync(text).GetAwaiter().GetResult();
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

        public void RequestAction(Action action, string eventCategory, string eventAction)
        {
            var request = _page.RunAndWaitForRequestAsync(async () =>
            {
                action();
            }, x => x.Url.Contains("www.google-analytics.com")).Result;

            var returnData = HttpUtility.UrlDecode(request.Url);
            returnData.Should().Contain($"ec={eventCategory}");
            returnData.Should().Contain($"ea={eventAction}");
        }
    }
}
