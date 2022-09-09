using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    internal class Input : BaseWebComponent
    {
        public ILocator CleanInputButton =>
            Instance.Locator("//following-sibling::button//img[@class='clearSearchButton']");

        // Use only for error messages below input fields in apply for a job page
        public ILocator ErrorMessage => Instance.Locator("//following-sibling::div[@id='error']");

        public override string Construct()
        {
            var selector = $"//input[contains(@data-id,'Input-{Identifier.ToAutomationValue()}')]";
            return selector;
        }
    }
}