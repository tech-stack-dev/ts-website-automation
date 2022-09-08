using Microsoft.Playwright;
using PlaywrightAutomation.Pages;

namespace PlaywrightAutomation.Components
{
    public class Breadcrumbs : BaseWebComponent, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__BreadcrumbsHeaderWrapper')]";

        public ILocator SharedJobsPart => Instance.Locator("//a[@data-id='BreadcrumbsLink-SharedJobs']");
        public ILocator JobTitlePart => Instance.Locator("//span[@class='mobile-breadcrumbs-margin']");

        public override string Construct()
        {
            var selector = "//div[@class='breadcrumbs-block']";
            return selector;
        }
    }
}
