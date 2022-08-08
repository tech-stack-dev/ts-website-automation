using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.Base;
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

        public static ILocator GetComponent<T>(this IPage page, string identifier,
            PageLocatorOptions pageLocatorOptions) where T : BaseWebComponent, new()
        {
            T obj = page.Component<T>(identifier);
            obj.Build();
            return obj.Instance;
        }

        public static ILocator GetComponent<T>(this IPage page, string identifier) where T : BaseWebComponent, new()
        {
            T obj = page.Component<T>(identifier);
            obj.Build();
            return obj.Instance;
        }

        public static ILocator GetComponent<T>(this IPage page) where T : BaseWebComponent, new()
        {
            T obj = page.Component<T>();
            obj.Build();
            return obj.Instance;
        }

        public static ILocator GetComponent<T>(this IPage page, string identifier, Properties props)
            where T : BaseWebComponent, new()
        {
            return page.Component<T>(identifier, props).Instance;
        }

        public static ILocator GetComponent<T>(this IPage page, Properties props) where T : BaseWebComponent, new() =>
            page.Component<T>(props).Instance;
    }
}
