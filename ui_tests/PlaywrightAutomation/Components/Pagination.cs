using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    internal class Pagination : BaseWebComponent
    {
        public ILocator PaginationButtons => Instance.Locator("//div[contains(@class,'PaginationButtonWrapper')]");

        public ILocator FirstPage => Instance.Locator("//div[contains(@class,'PaginationButtonWrapper')]",
            new LocatorLocatorOptions {HasTextString = "1"});

        public override string Construct()
        {
            var selector = "//div[contains(@class,'PaginationWrapper')]";
            return selector;
        }

        public ILocator ArrowButtonByDirection(string buttonDirection)
        {
            return Instance.Locator($"//div[not(contains(@class,'PageNumber'))]//img[contains(@src,'{buttonDirection}')]");
        }
    }
}
