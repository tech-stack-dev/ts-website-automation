using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class TechstackRolesPage: BasePage, IWebContainer
    {
        public string Container => "//div[@id='techstackRoles']";

        public ILocator ParagraphTitle => Page.Locator(Container)
                    .Locator("//div[@class='paragraph-title']");
        public ILocator ParagraphDescription => Page.Locator(Container)
            .Locator("//div[@class='paragraph-description']");
        public ILocator BlockTitle => Page.Locator(Container).Locator("//*[contains(@class,'block-title')]");
        public ILocator TextDescription => Page.Locator(Container).Locator("//*[contains(@class,'text-description')]");

    }
}
