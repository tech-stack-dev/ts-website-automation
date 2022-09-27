using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    internal class Pagination : BaseWebComponent
    {
        public ILocator PaginationButtons => Instance.Locator("//div[contains(@class,'PaginationButtonWrapper')]");

        public override string Construct()
        {
            var selector = "//div[contains(@class,'PaginationWrapper')]";
            return selector;
        }
    }
}
