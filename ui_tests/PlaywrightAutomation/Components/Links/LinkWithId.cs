using Microsoft.Playwright;

namespace PlaywrightAutomation.Components.Links
{
    public class LinkWithId : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//a[@id='contact-form-success']";
            return selector;
        }

        public ILocator MemberLink(string link)
        {
            return Page.Locator($"//a[@id='member-{link}']");
        }
    }
}
