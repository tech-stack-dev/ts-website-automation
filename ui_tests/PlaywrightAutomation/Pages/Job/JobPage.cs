using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class JobPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'DescriptionWrapper')]";

        public ILocator Tags => Page.Locator("//div[@data-id='CardTag-Title']");
        public ILocator Title => Page.Locator("//div[@class='career-title']");
        // To check that social media icons are under the job's title
        public ILocator SocialIcons => Title.Locator("//following-sibling::div//div[@class='social-icons-wrapper']");
        public ILocator SocialIconsText => SocialIcons.Locator("//p[@class='social-icons-share']");
        public ILocator BlockTitles => Page.Locator("//div[@class='block-title']");
        public ILocator ApplyContainer => Page.Locator("//div[contains(@class,'ApplyPropositionWrapper')]");
        public ILocator SearchValue => Page.Locator("//span[contains(@class,'searchValue')]");
        public ILocator CountOfResults => Page.Locator("//span[contains(@class,'careersCount')]");
    }
}
