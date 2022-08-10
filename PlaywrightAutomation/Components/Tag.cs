using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Tag : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Tag-{Identifier.ToAutomationValue()}')]";
            return selector;
        }

        public ILocator ChosenTags()
        {
            return Page.Locator($"//div[contains(@class,'_FilterListWrapper')]//div[@class='chosen-tags']");
        }

        public ILocator SelectedTagsFromSightBar(string sightBarName)
        {
            var sightBar = Page.Locator($"//div[contains(@class,'_FilterListWrapper')]//div[@class='Collapsible']",
                new PageLocatorOptions {HasTextString = sightBarName});

            return sightBar;
        }

        public ILocator SelectedTagsList()
        {
            return Page.Locator("//div[@class='tags-wrapper']//div[contains(@class,'active-tag')]");
        }
    }
}
