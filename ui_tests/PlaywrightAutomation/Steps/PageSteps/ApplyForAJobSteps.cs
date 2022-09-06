using System.Linq;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages.ApplyForAJob;
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

        [Then(@"Error messages are displayed under field")]
        public void ThenErrorMessagesAreDisplayedUnderField(Table table)
        {
            var values = table.CreateSet<(string name, string messages)>();

            foreach (var message in values)
            {
                var parent = _page.Component<Input>(message.name);
                var errorMessage = parent.Locator(_page.Init<ApplyForAJobPage>().ErrorMessage).InnerTextAsync().Result;
                errorMessage.Should().Be(message.messages);
            }
        }
    }
}
