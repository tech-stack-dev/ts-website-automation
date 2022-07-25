using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class Tag : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Tag-{Identifier}')]";
            return selector;
        }

        public ILocator ChosenTags()
        {
            return Page.Locator($"//div[@class='chosen-tags']{Construct()}");
        }

        public ILocator SelectedTagsList()
        {
            return Page.Locator("//div[@class='tags-wrapper']//div[contains(@class,'active-tag')]");
        }
    }
}
