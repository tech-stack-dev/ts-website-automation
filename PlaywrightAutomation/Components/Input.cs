using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    internal class Input : BaseWebComponent
    {
        public ILocator CleanSearchInput =>
            Instance.Locator("//following-sibling::button//img[@class='clearSearchButton']");

        public override string Construct()
        {
            var selector = $"//input[contains(@data-id,'{Identifier.ToAutomationValue()}FieldInput')]";
            return selector;
        }
    }
}