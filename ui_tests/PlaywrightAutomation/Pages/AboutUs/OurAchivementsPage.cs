using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class OurAchivementsPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='ourAchievements']";
        public ILocator Achievements => Page.Locator(Container).Locator("//div[contains(@class,'AchievementInfoBlock')]");
        public ILocator Title => Achievements.Locator("//h2");
        public ILocator Description => Achievements.Locator("//span");
    }
}
