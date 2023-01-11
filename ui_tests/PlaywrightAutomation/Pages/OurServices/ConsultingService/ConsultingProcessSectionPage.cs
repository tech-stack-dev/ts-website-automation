using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class ConsultingProcessSectionPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='consulting-process-section']";

        public ILocator RightActiveTimeline => Page.Locator("//div[@id='right-timeline-control']");

        public ILocator LeftActiveTimeline => Page.Locator("//div[@id='left-timeline-control']");
    }
}
