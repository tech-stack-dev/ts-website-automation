using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class Card : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'{Identifier}Wrapper')]";
            return selector;
        }

        public ILocator GetHeaderCard()
        {
            return Instance.Locator("//div[@class='card-header']");
        }
        
        public ILocator GetFooterCard()
        {
            return Instance.Locator("//div[@class='card-footer']");
        }
    }
}
