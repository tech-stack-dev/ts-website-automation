using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class ConsultingServiceTopPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'service-top-section')]";

        public ILocator BreadCrumbsPrev => Page.Locator("//a[@id='bredcrumbs-prev']");
    }
}
