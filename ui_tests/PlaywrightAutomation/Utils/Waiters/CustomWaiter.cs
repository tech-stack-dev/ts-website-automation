using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Utils.Waiters
{
    public class CustomWaiter
    {
        public void WaiterWithReloadPage(IPage page, ILocator locator)
        {
            for (int i = 0; i < 24; i++)
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

        public void WaiterDefaultCareers(IPage page, List<string> careersList)
        {
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

                if (numberAttempts.Equals(5))
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
    }
}
