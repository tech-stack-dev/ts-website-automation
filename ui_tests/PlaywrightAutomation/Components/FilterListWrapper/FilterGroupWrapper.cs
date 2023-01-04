using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    internal class FilterGroupWrapper : BaseWebComponent
    {
        public ILocator FilterHeader => Instance.Locator("//div[contains(@class,'styledComponents__FilterGroupHeader')]");

        public override string Construct()
        {
            // TODO Ask Front-End team to add data-id
            var selector = $"//div[contains(text(),'{Identifier}')]//ancestor::div[contains(@class,'styledComponents__FilterGroupWrapper')]";
            return selector;
        }

        public bool CollapsibleState()
        {
            var element = Instance.Locator("//span[contains(@class,'Collapsible__trigger')]")
                .ElementHandleAsync().Result
                .GetAttributeAsync("class").Result.Contains("is-open");
            return element;
        }
    }
}
