using AutomationUtils.Extensions;
using AutomationUtils.Utils;
using Contentful.Core.Models.Management;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Providers;
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

        [Then(@"'([^']*)' text is displayed on Contact Us form")]
        public void ThenTextIsDisplayedOnApplyContainerOnJobPage(string expectedText)
        {
            var actualText = _page.Init<ContactUsPage>().Text.TextContentAsync().GetAwaiter().GetResult();
            actualText.Should().Be(expectedText);
        }

        [When(@"User attach '([^']*)' file")]
        public void WhenUserAttachFile(string file)
        {
            var filePath = $"{PathProvider.ResourcesFolder}/{file}";
            _page.Init<ContactUsPage>().AttachFileInput.SetInputFilesAsync(filePath);
        }

        [Then(@"'([^']*)' attached file name is displayed in input")]
        public void ThenAttachedFileNameIsDisplayedInWebElement(string expectedFileName)
        {
            var actualFileName = _page.Init<ContactUsPage>().AttachedFile.TextContentAsync().GetAwaiter().GetResult();
            actualFileName.Should().Be(expectedFileName);
        }

        [Then(@"'([^']*)' error message is displayed under attache files input")]
        public void ThenErrorMessagesIsDisplayedUnderAttacheFilesInput(string expectedErrorMessage)
        {
            var actualErrorMessage = _page.Init<ContactUsPage>().ErrorMessageForAttachInput.InnerTextAsync().GetAwaiter().GetResult();
            actualErrorMessage.Should().Be(expectedErrorMessage);
        }
    }
}
