using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class EngineeringCulturePage: BasePage, IWebContainer
    {
        public string Container => "//div[@id ='engineeringCulture']";
        public ILocator paragraphTitle => Page.Locator(Container).Locator("//div[@class='paragraph-title']");
        public ILocator blockTitle => Page.Locator(Container).Locator("//div[@class='block-title']");
        public ILocator textDescription => Page.Locator(Container).Locator("//div[@class='text-description']");

       // public string carouselNextButton => "//button[contains(@data-id,'CarouselNextButton')]";


    }
}
