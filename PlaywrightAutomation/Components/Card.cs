using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Card : BaseWebComponent
    {
        public ILocator Logo => Instance.Locator("//div[@class='card-header']");

        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'CardWrapper-{Identifier.ToAutomationValue()}')]";
            return selector;
        }

        public ILocator GetAllExistCardTags()
        {
            return Instance.Locator("//button[contains(@data-id,'CardHeaderDirectionTitle-')]");
        }

        public ILocator CardTitle()
        {
            return Instance.Locator("//div[@class='card-header-position-title']");
        }

        public ILocator CardFooter()
        {
            return Instance.Locator("//div[@class='card-footer']");
        }
    }
}