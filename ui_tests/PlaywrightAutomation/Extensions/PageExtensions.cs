using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Pages;
using System;
using System.Threading;
using System.Threading.Tasks;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Extensions
{
    public static class PageExtensions
    {
        #region Page

        public static T Init<T>(this IPage page) where T : BasePage, new()
        {
            T newPage = new T
            {
                Page = page
            };
            return newPage;
        }

        #endregion

        #region Component

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

        #endregion

        #region Waiters

        public static void WaiterWithReloadPage(this IPage page, ILocator locator, AmountOfTime amountOfTime = AmountOfTime.Medium)
        {
            var ms = 5000;

            for (var i = 0; i < (int)amountOfTime; i++)
            {
                if (!locator.Count().Equals(0))
                {
                    break;
                }

                page.ReloadAsync().GetAwaiter().GetResult();
                Task.Delay(ms).GetAwaiter().GetResult();
            }

            if (locator.Count().Equals(0))
            {
                throw new Exception($"Timeout {ms * (int)amountOfTime}ms exceeded.");
            }
        }

        public static T ExecuteFunc<T>(this IPage page, Func<T> actionToDo, AmountOfTime amountOfTime = AmountOfTime.Short)
        {
            for (int i = 0; i < (int)amountOfTime; i++)
            {
                try
                {
                    return (T)actionToDo.Invoke();
                }
                catch (Exception)
                {
                    Thread.Sleep(1000);
                }
            }

            throw new Exception("Unable to execute Function for Page");
        }

        public static Action ExecuteFunc(this IPage page, Action actionToDo, AmountOfTime amountOfTime = AmountOfTime.Short)
        {
            for (int i = 0; i < (int)amountOfTime; i++)
            {
                try
                {
                    actionToDo.Invoke();
                    break;
                }
                catch (Exception)
                {
                    Thread.Sleep(1000);
                }
            }

            throw new Exception("Unable to execute Action for Page");
        }

        public enum AmountOfTime
        {
            Short = 2,
            Medium = 6,
            Long = 12,
            ExtraLong = 24
        }

        #endregion
    }
}