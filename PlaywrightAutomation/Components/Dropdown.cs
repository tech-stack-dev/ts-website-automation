using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Dropdown : BaseWebComponent
    {
        public ILocator ActiveTagsCounter => Instance.Locator("//div[contains(@class,'ActiveTagsCounter')]");
        public ILocator PathToTags => Instance.Locator("//following-sibling::ul");

        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Section{Identifier.ToAutomationValue()}')]";
            return selector;
        }
    }
}