using Microsoft.Playwright;
using PlaywrightAutomation.Pages;

namespace PlaywrightAutomation.Extensions
{
    public static class PageExtensions
    {
        public static T Init<T>(this IPage page) where T : BasePage, new()
        {
            T newPage = new T
            {
                Page = page
            };
            return newPage;
        }
    }
}
