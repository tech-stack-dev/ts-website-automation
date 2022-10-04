using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

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

        [Then(@"'([^']*)' text is displayed on Contact Us modal window")]
        public void ThenTextIsDisplayedOnContactUsModalWindow(string expectedText)
        {
            var actualText = _page.Init<ContactUsPage>().Text.TextContentAsync().GetAwaiter().GetResult();
            actualText.Should().Be(expectedText);
        }

        [When(@"User attaches '([^']*)' file on Contact Us form")]
        public void WhenUserAttachesFileOnContactUsForm(string file)
        {
            var filePath = $"{PathProvider.ResourcesFolder}/{file}";
            _page.Init<ContactUsPage>().AttachFileInput.SetInputFilesAsync(filePath).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' attached file name is displayed in input")]
        public void ThenAttachedFileNameIsDisplayedInInput(string expectedFileName)
        {
            var actualFileName = _page.Init<ContactUsPage>().AttachedFileName.TextContentAsync().GetAwaiter().GetResult();
            actualFileName.Should().Be(expectedFileName);
        }

        [Then(@"'([^']*)' error message is displayed under attach files input")]
        public void ThenErrorMessagesIsDisplayedUnderAttachFilesInput(string expectedErrorMessage)
        {
            var actualErrorMessage = _page.Init<ContactUsPage>().ErrorMessageForAttachInput.InnerTextAsync().GetAwaiter().GetResult();
            actualErrorMessage.Should().Be(expectedErrorMessage);
        }

        [When(@"User set '([^']*)' text to message field on Contact Us form")]
        public void WhenUserSetTextToMessageFieldOnContactUsForm(string text)
        {
            _page.Init<ContactUsPage>().TextArea.FillAsync(text).GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }
    }
}
