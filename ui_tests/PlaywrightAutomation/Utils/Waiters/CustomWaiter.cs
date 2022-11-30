using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Utils.Waiters
{
    public static class CustomWaiter
    {
        public static void WaiterWithReloadPage(this IPage page, ILocator locator, string amountOfTime = "ExtraLong")
        {
            int time = (int)Enum.Parse(typeof(AmountOfTime), amountOfTime);

            for (var i = 0; i < time; i++)
            {
                if (locator.Count().Equals(0))
                {
                    page.ReloadAsync().GetAwaiter().GetResult();
                    Task.Delay(5000).GetAwaiter().GetResult();
                }

                if (!locator.Count().Equals(0))
                {
                    break;
                }
            }

            if (locator.Count().Equals(0))
            {
                throw new Exception("Timeout 120000ms exceeded.");
            }
        }

        public static void WaitForDefaultCareers(this IPage page, List<string> careersList, string amountOfAttempt = "FiveAttempt")
        {
            int attempt = (int)Enum.Parse(typeof(NumberOfAttempts), amountOfAttempt);
            var pagination = page.Component<Pagination>();
            var paginationArrowRight = pagination.ArrowButtonByDirection("right");

            foreach (var defaultCareer in careersList)
            {
                var pascalCaseName = defaultCareer.ConvertToPascalCase();
                var component = page.Component<Card>(pascalCaseName);
                int numberAttempts = 0;

            restart:
                if (pagination.IsVisibleAsync().Result)
                {
                    pagination.HoverAsync().GetAwaiter().GetResult();
                }

                if (numberAttempts.Equals(attempt))
                {
                    throw new Exception($"'{pascalCaseName}' wasn't created in Contentful");
                }

                if (component.Count().Equals(0) && !pagination.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
                    goto restart;
                }

                if (component.Count().Equals(0) && pagination.IsVisibleAsync().GetAwaiter().GetResult()
                                                && paginationArrowRight.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    paginationArrowRight.ClickAsync().GetAwaiter().GetResult();
                    page.WaitForLoadStateAsync(LoadState.DOMContentLoaded).GetAwaiter().GetResult();
                    goto restart;
                }

                if (component.Count().Equals(0) && pagination.IsVisibleAsync().GetAwaiter().GetResult()
                                                && !paginationArrowRight.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    pagination.FirstPage.ClickAsync().GetAwaiter().GetResult();
                    page.ReloadAsync().GetAwaiter().GetResult();
                    page.WaitForLoadStateAsync(LoadState.DOMContentLoaded).GetAwaiter().GetResult();
                    numberAttempts++;
                    goto restart;
                }

                if (pagination.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    pagination.FirstPage.ClickAsync().GetAwaiter().GetResult();
                }
            }
        }

        public enum AmountOfTime
        {
            Short = 3,
            Medium = 10,
            Long = 15,
            ExtraLong = 24
        }

        public enum NumberOfAttempts
        {
            ThreeAttempt = 3,
            FiveAttempt = 5,
            TenAttempt = 10,
            FifteenAttempt = 15
        }
    }
}
