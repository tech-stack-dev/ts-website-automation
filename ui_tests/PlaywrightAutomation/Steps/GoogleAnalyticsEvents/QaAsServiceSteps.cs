using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using System;
using System.Web;
using TechTalk.SpecFlow;
using PlaywrightAutomation.Pages.OurServices;
using PlaywrightAutomation.RuntimeVariables;

namespace PlaywrightAutomation.Steps.GoogleAnalyticsEvents;

    [Binding]
    internal class QaAsServiceSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly GoogleAnalyticsRequestData _googleAnalyticsRequestData;

        public QaAsServiceSteps(BrowserFactory browserFactory, GoogleAnalyticsRequestData googleAnalyticsRequestData)
        {
            _page = browserFactory.Page;
            _googleAnalyticsRequestData = googleAnalyticsRequestData;
        }

        [When(@"User clicks source breadcrumbs button")]
        public void WhenUserClicksSourceBreadcrumbsButton()
        {
            _googleAnalyticsRequestData.Value = MakeActionAndGetGoogleAnalyticsRequest(() =>
            {
                _page.Init<QaAsServicePage>().BreadcrumbsSourceSectionButton.ClickAsync().GetAwaiter().GetResult();
            });
        }

        [When(@"User clicks 'Request A Quote' button in the header section")]
        public void WhenUserClicksRequestAQuoteButtonInTheHeaderSection()
        {
            _googleAnalyticsRequestData.Value = MakeActionAndGetGoogleAnalyticsRequest(() =>
            {
                _page.Init<QaAsServicePage>().TopSectionRequestQuoteButton.ClickAsync().GetAwaiter().GetResult();
            });
        }

        [When(@"User clicks 'Request A Quote' button in the 'Our Approach' section")]
        public void WhenUserClicksRequestAQuoteButtonInTheOurApproachSection()
        {
            _googleAnalyticsRequestData.Value = MakeActionAndGetGoogleAnalyticsRequest(() =>
            {
                _page.Init<QaAsServicePage>().OurApproachRequestQuoteButton.ClickAsync().GetAwaiter().GetResult();
            });
        }

        [When(@"User clicks arrow wrapper for '(.*)' field in 'Services' section")]
        public void WhenUserClicksArrowWrapperForFieldInServicesSection(string fieldHeaderText)
        {
            _googleAnalyticsRequestData.Value = MakeActionAndGetGoogleAnalyticsRequest(() =>
            {
                _page.Init<QaAsServicePage>().GetArrowWrapperForServicesSectionByText(fieldHeaderText).ClickAsync().GetAwaiter().GetResult();
            });
        }

        [When(@"User clicks card with '(.*)' header text from 'Case studies' section")]
        public void WhenUserClicksCardWithHeaderTextFromCaseStudiesSection(string cardHeaderText)
        {
            _googleAnalyticsRequestData.Value = MakeActionAndGetGoogleAnalyticsRequest(() =>
            {
                _page.Init<QaAsServicePage>().GetCaseStudiesCardByHeaderText(cardHeaderText).ClickAsync().GetAwaiter().GetResult();
            });
        }

        [When(@"User clicks arrow wrapper for '(.*)' field in 'FAQ' section")]
        public void WhenUserClicksArrowWrapperForFieldInFAQSection(string fieldHeaderText)
        {
            _googleAnalyticsRequestData.Value = MakeActionAndGetGoogleAnalyticsRequest(() =>
            {
                _page.Init<QaAsServicePage>().GetArrowWrapperForFAQSectionByText(fieldHeaderText).ClickAsync().GetAwaiter().GetResult();
            });
        }

        [When(@"User clicks 'Open Source' arrow")]
        public void WhenUserClicksOpenSourceArrow()
        {
            _googleAnalyticsRequestData.Value = MakeActionAndGetGoogleAnalyticsRequest(() =>
            {
                _page.Init<QaAsServicePage>().OpenSourceArrow.ClickAsync().GetAwaiter().GetResult();
            });
        }

        [Then(@"User sees '(.*)' event category and '(.*)' event action")]
        public void ThenUserSeesEventCategoryAndEventAction(string eventCategory, string eventAction)
        {
            var requestData = HttpUtility.UrlDecode(_googleAnalyticsRequestData.Value.Url);
            requestData.Should().Contain($"ec={eventCategory}");
            requestData.Should().Contain($"ea={eventAction}");
        }

        private IRequest MakeActionAndGetGoogleAnalyticsRequest(Action action)
        {
            var request = _page
                .RunAndWaitForRequestAsync(async () => { action(); }, x => x.Url.Contains("www.google-analytics.com"))
                .GetAwaiter().GetResult();
            return request;
        }
    }