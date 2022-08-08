using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class Card : BaseWebComponent
    {
        protected override string Construct()
        {
            var selector = $"//div[contains(@data-id,'CardWrapper-{Identifier}')]";
            return selector;
        }

        public ILocator CardHeader()
        {
            return Instance.Locator("//div[@class='card-header']");
        }

        public ILocator CardTag()
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