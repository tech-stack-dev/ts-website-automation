using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Button : BaseWebComponent
    {
        public ILocator SocialShareButton => Instance.Locator("//button");

        public override string Construct()
        {
            var selector = $"//*[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]";
            return selector;
        }
    }
}