using System.Linq;
using Microsoft.Playwright;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

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
            var inputs = table.Rows.SelectMany(x => x.Values).ToList();
        }
    }
}
