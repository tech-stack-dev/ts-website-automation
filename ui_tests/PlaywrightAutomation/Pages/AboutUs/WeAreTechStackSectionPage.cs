using Contentful.Core.Models;
using Microsoft.Playwright;
using PlaywrightAutomation.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class WeAreTechStackSectionPage: BasePage, IWebContainer
    {
        public string Container => "//div[@id='weAreTechstack']";
        public ILocator Title => Page.Locator(Container)
            .Locator("//div[@class='paragraph-title']");
        public ILocator Description => Page.Locator(Container)
            .Locator("//div[@class='paragraph-content']");

    }
}
