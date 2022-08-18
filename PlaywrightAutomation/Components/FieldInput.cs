using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    internal class FieldInput : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//input[contains(@data-id,'{Identifier.ToAutomationValue()}FieldInput')]";
            return selector;
        }

        public ILocator CleanSearchByRoleInput()
        {
            return Instance.Locator("//following-sibling::button//img[@class='clearSearchButton']");
        }
    }
}