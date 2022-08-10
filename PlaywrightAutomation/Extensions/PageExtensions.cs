using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Pages;
using static PlaywrightAutomation.Components.BaseWebComponent;

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

        public static T Component<T>(this IPage page, string identifier) where T : BaseWebComponent, new()
        {
            T obj = new T
            {
                Page = page,
                Identifier = identifier
            };
            obj.Build();
            return obj;
        }

        public static T Component<T>(this IPage page) where T : BaseWebComponent, new()
        {
            T obj = new T
            {
                Page = page
            };
            obj.Build();
            return obj;
        }

        public static T Component<T>(this IPage page, Properties props) where T : BaseWebComponent, new()
        {
            T obj = new T()
            {
                Page = page,
                Props = props
            };
            obj.Build();
            return obj;
        }

        public static T Component<T>(this IPage page, string identifier, Properties props) where T : BaseWebComponent, new()
        {
            T obj = new T
            {
                Page = page,
                Identifier = identifier,
                Props = props
            };
            obj.Build();
            return obj;
        }
    }
}
