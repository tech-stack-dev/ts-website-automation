using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class Pagination : BaseWebComponent
    {
        public ILocator PaginationButtons => Instance.Locator("PaginationButtonWrapper");

        public override string Construct()
        {
            var selector = "//div[contains(@class,'PaginationWrapper')]";
            return selector;
        }
    }
}
