namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class AboutUsPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'MainLayoutWrapper')]";
        public string Title => "//div[@class='paragraph-title']";
        public string Description => "//div[@class='paragraph-content']";
        public string BlockTitle => "//div[@class='block-title']";
        public string TextDescription => "//div[@class='text-description']";
        public string Images = "//img[@alt='photo']";
        public string NumberInCarousel = "//h3";
        public string TitleInCarousel = "//h2";
        public string DescriptionInCarousel = "//div[contains(normalize-space(@class),'content-text')]";
        public string FooterBlock = "//div[contains(@class,'FooterWrapper')]";
        public string FirstElCarousel = "//div[contains(@class,'kSncrs')]";
    }
}