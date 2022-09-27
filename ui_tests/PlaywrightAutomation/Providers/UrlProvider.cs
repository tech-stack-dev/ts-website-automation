using AutomationUtils.Extensions;
using AutomationUtils.Utils;

namespace PlaywrightAutomation.Providers
{
    internal class UrlProvider
    {
        public static string Application => Config.Read.ByKey("AppUrl");
    }
}
