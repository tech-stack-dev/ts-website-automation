using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class OurApproachPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='consulting-service-our-approach-section']";
    }
}
