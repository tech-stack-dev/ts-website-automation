using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages.OurServices.ConsultingService;
using PlaywrightAutomation.Utils;
using System.ComponentModel;
using System.Web;
using System.Xml.Linq;
using FluentAssertions;
using PlaywrightAutomation.Pages.OurServices.QaAsAService;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.GoogleAnalyticsEvents
{
    [Binding]
    internal class GAEventsOnQaAsAService : SpecFlowContext
    {
        private readonly IPage _page;

        public GAEventsOnQaAsAService(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }
    }
}
