using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Dropdown : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Section{Identifier.ToAutomationValue()}')]";
            return selector;
        }

        public ILocator ActiveTagsCounter()
        {
            return Instance.Locator("//div[contains(@class,'ActiveTagsCounter')]");
        }

        public ILocator PathToTags()
        {
            return Instance.Locator("//following-sibling::ul");
        }
    }
}