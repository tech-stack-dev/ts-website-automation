using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Pages.AboutUs
{
    internal class OurAchivementsPage: BasePage, IWebContainer
    {
        public string Container => "//div[@id='ourAchievements']";
        public string Achivements => "//div[contains(@class,'AchievementInfoBlock')]";
        public string Title => "//h2";
        public string Description => "//span";

    }
}
