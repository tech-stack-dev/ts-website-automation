using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class RelatedArticlesSectionPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='related-articles-section']";

        public ILocator RelatedArticles => Page.Locator(Container).Locator("//div[@class='img-card']");

        public string Title => "//div[@class='img-card-title']";
    }
}
