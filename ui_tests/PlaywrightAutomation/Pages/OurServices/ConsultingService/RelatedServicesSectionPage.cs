using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class RelatedServicesSection : BasePage, IWebContainer
    {
        public string Container => "//div[@id='consulting-related-services-section']";

        // Use with 'ContentBlock' method
        public string BlockNames => "//h3";

        public ILocator ContentBlock(string blockName)
        {
            return Page.Locator(Container).Locator($"//h3[contains(text(),'{blockName}')]//..");
        }
    }
}
