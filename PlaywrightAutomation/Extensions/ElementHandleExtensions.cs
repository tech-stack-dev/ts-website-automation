using Microsoft.Playwright;

namespace PlaywrightAutomation.Extensions
{
    public static class ElementHandleExtensions
    {
        public static string GetValue(this IElementHandle element)
        {
            return element.GetAttributeAsync("value").GetAwaiter().GetResult();
        }
    }
}
