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

        public ILocator ArrowButtonByDirection(string buttonDirection)
        {
            return Instance.Locator($"//div[not(contains(@class,'PageNumber'))]//img[contains(@src,'{buttonDirection}')]");
        }

        public void ReturnToFirstPage()
        {
            if (Instance.IsVisibleAsync().GetAwaiter().GetResult())
            {
                PaginationButtons.Nth(0).ClickAsync().GetAwaiter().GetResult();
            }
        }

        public bool MoveToAndCheckPaginationArrow()
        {
            if (Instance.IsVisibleAsync().GetAwaiter().GetResult())
            {
                Instance.HoverAsync().GetAwaiter().GetResult();
                return ArrowButtonByDirection("right").IsVisibleAsync().GetAwaiter().GetResult();
            }

            return false;
        }
    }
}
