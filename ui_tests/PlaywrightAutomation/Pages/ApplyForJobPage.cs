using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class ApplyForJobPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__WrapperCareerForm')]";
    }
}
