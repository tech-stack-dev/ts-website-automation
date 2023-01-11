using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class ConsultingFaqSectionPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='consulting-faq-section']";

        public ILocator CollapseArrow => Page.Locator(Container).Locator("//img[@class='collapse-arrow']");
    }
}
