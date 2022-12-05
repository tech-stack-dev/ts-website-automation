using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using System;
using System.Collections.Generic;

namespace PlaywrightAutomation.Utils.Waiters
{
    public static class CustomWaiter
    {
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
                    pagination.PaginationButtons.Nth(0).ClickAsync().GetAwaiter().GetResult();
                    page.ReloadAsync().GetAwaiter().GetResult();
                    page.WaitForLoadStateAsync(LoadState.DOMContentLoaded).GetAwaiter().GetResult();
                    numberAttempts++;
                    goto restart;
                }

                if (pagination.IsVisibleAsync().GetAwaiter().GetResult())
                {
                    pagination.PaginationButtons.Nth(0).ClickAsync().GetAwaiter().GetResult();
                }
            }
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
