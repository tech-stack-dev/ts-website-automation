using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Card : BaseWebComponent
    {
        public ILocator DirectionTitle => Instance.Locator("//button[@data-id='CardHeaderDirectionTitle-DirectionTagName']");
        public ILocator Title => Instance.Locator("//div[@class='card-header-position-title']");

        public override string Construct()
        {
            var selector = $"//a[contains(@data-id,'CardWrapper-{Identifier.ToAutomationValue()}')]";
            return selector; 
        }
    }
}