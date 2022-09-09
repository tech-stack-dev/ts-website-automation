using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class CardComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public CardComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        [When(@"User clicks on '([^']*)' card title")]
        public void WhenUserClicksOnCardTitle(string title)
        {
            _page.Component<Card>(title).Title.ClickAsync().GetAwaiter().GetResult();
        }
    }
}
