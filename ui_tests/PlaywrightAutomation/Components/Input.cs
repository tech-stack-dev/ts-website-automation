using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    internal class Input : BaseWebComponent
    {
        public ILocator CleanInputButton =>
            Instance.Locator("//following-sibling::button//img[@class='clearSearchButton']");

        public override string Construct()
        {
            var selector = $"//input[contains(@data-id,'Input-{Identifier.ToAutomationValue()}')]";
            return selector;
        }
    }
}