using AutomationUtils.Extensions;
using AutomationUtils.Utils;

namespace PlaywrightAutomation.Providers
{
    internal class BrowserConfigProvider
    {
        public static bool Headless => bool.Parse(Config.Read.ByKey("Browser_Headless"));
    }
}
