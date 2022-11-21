using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Pages.AboutUs
{
    public class ApplyTitlePage: BasePage, IWebContainer
    {
        public string Container => "//div[@id='apply-title']";

    }
}

