using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Tag : BaseWebComponent
    {
        public ILocator ChosenTags => Page.Locator("//div[contains(@class,'_FilterListWrapper')]//div[@class='chosen-tags']");

        public ILocator ActiveTagsIntoDropdown =>
            Page.Locator("//div[@class='tags-wrapper']//div[contains(@class,'active-tag')]");

        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Tag-{Identifier.ToAutomationValue()}')]";
            return selector;
        }

        public ILocator SelectedTagsFromSightBar(string sightBarName = null)
        {
            var sightBar = Page.Locator("//div[contains(@class,'_FilterListWrapper')]//div[@class='Collapsible']",
                new PageLocatorOptions {HasTextString = sightBarName});
            return sightBar;
        }
    }
}
