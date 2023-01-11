using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class ConsultingExpertsPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='consulting-experts-section']";

        public ILocator MemberLinkedInLink => Page.Locator("//a[@class='member-link-1']");

        public ILocator MemberBlogLink => Page.Locator("//a[@class='member-link-2']");

        public string MemberName => "//parent::div//preceding-sibling::h3";
    }
}
