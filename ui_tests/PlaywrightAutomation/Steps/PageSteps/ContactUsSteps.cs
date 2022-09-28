using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace PlaywrightAutomation.Steps.PageSteps
{
    [Binding]
    internal class ContactUsSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public ContactUsSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [Then(@"'([^']*)' title is displayed on Contact Us form")]
        public void ThenTitleIsDisplayedOnContactUsForm(string expectedTitle)
        {
            var actualTitle = _page.Init<ContactUsPage>().Title.TextContentAsync().GetAwaiter().GetResult();
            actualTitle.Should().Be(expectedTitle);
        }
    }
}
