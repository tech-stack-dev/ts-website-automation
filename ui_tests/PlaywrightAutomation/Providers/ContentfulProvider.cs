using AutomationUtils.Extensions;
using AutomationUtils.Utils;

namespace PlaywrightAutomation.Providers
{
    internal class ContentfulProvider
    {
        public static string ManagmentApiKey => Config.Read.ByKey("Contentful_ManagmentApiKey");
        public static string SpaceId => Config.Read.ByKey("Contentful_SpaceId");
    }
}
