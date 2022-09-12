using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace PlaywrightAutomation.Steps.PageSteps
{
    [Binding]
    internal class ApplyForAJobSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public ApplyForAJobSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [Then(@"Error messages are displayed under fields")]
        public void ThenErrorMessagesAreDisplayedUnderFields(Table table)
        {
            var values = table.CreateSet<(string inputName, string messageText)>();

            foreach (var message in values)
            {
                var errorMessage = _page.Component<Input>(message.inputName).ErrorMessage.InnerTextAsync().Result;
                errorMessage.Should().Be(message.messageText);
            }
        }
    }
}
