using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using System;
using System.Collections.Generic;

namespace PlaywrightAutomation.Pages
{
    internal class CareerMainPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__CareerMainBody')]";

        public void WaitForMockedCareers(List<string> careersList, NumberOfAttempts amountOfAttempt = NumberOfAttempts.FiveAttempt)
        {
            foreach (var defaultCareer in careersList)
            {
                var result = false;

                for (var i = 0; i < (int)amountOfAttempt; i++)
                {
                    result = CheckCareerDisplayed(Page.Component<Card>(defaultCareer.ConvertToPascalCase()));

                    if (result)
                    {
                        break;
                    }

                    Page.Component<Pagination>().ReturnToFirstPage();
                    Page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
                }

                if (!result)
                {
                    throw new Exception($"'{defaultCareer.ConvertToPascalCase()}' wasn't created in Contentful");
                }
            }
        }

        private bool CheckCareerDisplayed(ILocator component)
        {
            var pagination = Page.Component<Pagination>();
            var paginationArrowRight = pagination.ArrowButtonByDirection("right");

            if (component.Count() > 0)
            {
                return true;
            }

            while (pagination.FocusAndGetPaginationArrowDisplayedState())
            {
                paginationArrowRight.ClickAsync().GetAwaiter().GetResult();

                if (component.Count() > 0)
                {
                    return true;
                }
            }

            return false;
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
