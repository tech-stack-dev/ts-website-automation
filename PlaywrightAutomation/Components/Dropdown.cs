using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Dropdown : BaseWebComponent
    {
        public ILocator ActiveTagsCounter => Instance.Locator("//div[contains(@class,'ActiveTagsCounter')]");
        public ILocator FiltersList => Instance.Locator("//div[contains(@class,'filters-list')]");

        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Section{Identifier.ToAutomationValue()}')]//parent::div[contains(@class,'FilterWrapper')]";
            return selector;
        }
    }
}