using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class Breadcrumbs : BaseWebComponent
    {
        public ILocator TabPart => Instance.Locator("//a");
        public ILocator JobTitlePart => Instance.Locator("//span[@class='mobile-breadcrumbs-margin']");

        public override string Construct()
        {
            var selector = "//div[@class='breadcrumbs-block']";
            return selector;
        }
    }
}
