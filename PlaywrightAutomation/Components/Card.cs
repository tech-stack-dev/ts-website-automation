using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Card : BaseWebComponent
    {
        public ILocator CardHeader => Instance.Locator("//div[@class='card-header']");
        public ILocator CardTitle => Instance.Locator("//div[@class='card-header-position-title']");

        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'CardWrapper-{Identifier.ToAutomationValue()}')]";
            return selector;
        }

        public ILocator GetAllExistCardTags()
        {
            return Instance.Locator("//button[contains(@data-id,'CardHeaderDirectionTitle-')]");
        }
    }
}