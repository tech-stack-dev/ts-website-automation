using System;
using System.Threading;
using System.Timers;
using FluentAssertions;
using FluentAssertions.Numeric;
using Microsoft.Playwright;
using OpenQA.Selenium.DevTools.V85.Memory;
using PlaywrightAutomation.Utils;

namespace PlaywrightAutomation.Extensions
{
    public static class LocatorExtensions
    {
        public static string GetBackgroundColor(this ILocator locator)
        {
            return locator.ElementHandleAsync().Result.GetBackgroundColor();
        }

        public static void WaiterForElement(this ILocator locator)
        {
            //locator.CheckAsync(new LocatorCheckOptions {Timeout = 60000});
            //var myTimer = new System.Timers.Timer(5000);
            //myTimer.Elapsed += CountLocators2;
            //myTimer.AutoReset = true;
            //myTimer.Enabled = true;


            var periodicTimer = new PeriodicTimer(TimeSpan.FromSeconds(5));
            while ( periodicTimer.WaitForNextTickAsync() != default)
            {
                //var a = CountLocators(locator).Should().NotBe(0);
                if (CountLocators(locator) == 0)
                {
                    BrowserFactory browserFactory = new BrowserFactory();
                    var page = browserFactory.Page;
                    page.ReloadAsync().GetAwaiter().GetResult();
                }

                if (CountLocators(locator) != 0)
                {
                    periodicTimer.Dispose();
                }

                if (periodicTimer.Equals(TimeSpan.FromMinutes(1)))
                {
                    periodicTimer.Dispose();
                }
            }
        }

        public static void CountLocators2(object sender, ElapsedEventArgs elapsedEventArgs)
        {
            
        }

        public static int CountLocators(this ILocator locator)
        {
            return locator.CountAsync().GetAwaiter().GetResult();
        }
    }
}
