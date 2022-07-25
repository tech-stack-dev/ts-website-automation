using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class Filter : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Section{Identifier}')]";
            return selector;
        }

        public ILocator ActiveTagsCounter()
        {
            return Instance.Locator("//div[contains(@class,'ActiveTagsCounter')]");
        }
    }
}
