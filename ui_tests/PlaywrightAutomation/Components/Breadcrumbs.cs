using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class Breadcrumbs : BaseWebComponent
    {
        public ILocator SharedJobsPart => Instance.Locator("//a[@data-id='BreadcrumbsLink-shared.jobs']");
        public ILocator JobTitlePart => Instance.Locator("//span[@class='mobile-breadcrumbs-margin']");

        public override string Construct()
        {
            var selector = "//div[@class='breadcrumbs-block']";
            return selector;
        }
    }
}