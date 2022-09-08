using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class JobPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__SectionBlockListWrapper')]";

        public ILocator Tags => Page.Locator("//div[@data-id='CardTag-Title']");
        public ILocator Title => Page.Locator("//div[@class='career-title']");
        public ILocator SocialIcons => Page.Locator("//div[@class='career-title']/preceding-sibling::div[@class='tags-wrapper']/following-sibling::div[2]//div[@class='social-icons-wrapper']");
        
        public ILocator JobDescriptionTitles => Page.Locator("//div[@class='block-title']");
        public ILocator ApplyContainer => Page.Locator("//div[contains(@class,'styledComponents__ApplyPropositionWrapper')]");
    }
}
