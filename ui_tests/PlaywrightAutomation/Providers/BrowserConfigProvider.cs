using AutomationUtils.Extensions;
using AutomationUtils.Utils;

namespace PlaywrightAutomation.Providers
{
    public class BrowserConfigProvider
    {
        public static bool Headless => bool.Parse(Config.Read.ByKey("Browser_Headless"));
    }
}
