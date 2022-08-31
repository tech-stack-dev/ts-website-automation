using Microsoft.Playwright;

namespace PlaywrightAutomation.Extensions
{
    public static class ElementHandleExtensions
    {
        public static string GetValue(this IElementHandle element)
        {
            return element.GetAttributeAsync("value").GetAwaiter().GetResult();
        }

        public static string GetBackgroundColor(this IElementHandle element)
        {
            return element.EvaluateAsync("element => getComputedStyle(element).backgroundColor")
                .GetAwaiter().GetResult().Value.ToString();
        }
    }
}
