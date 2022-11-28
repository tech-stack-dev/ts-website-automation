using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using System;
using System.Timers;

namespace PlaywrightAutomation.Utils.Waiters
{
    public class CustomWaiter
    {
        public void WaiterWithReloadPage(IPage page, ILocator locator)
        {
            using var timer = new Timer(5000);
            DateTime dt = DateTime.Now;
            TimeSpan passedTime = default;
            timer.Elapsed += (source, e) => OnTimeEvent(source, e, page, 
                locator, dt, ref passedTime);
            timer.AutoReset = true;
            timer.Enabled = true;
            while (passedTime < TimeSpan.FromMinutes(1)) ;
            if (locator.CountLocators() == 0)
            {
                timer.Dispose();
                throw new Exception("Timeout 60000ms exceeded.");
            }
            timer.Dispose();
        }

        private void OnTimeEvent(object source, ElapsedEventArgs e, IPage page, 
            ILocator locator, DateTime dt, ref TimeSpan passedTime)
        {
            passedTime = e.SignalTime - dt;
            if (locator.CountLocators() == 0)
            {
                page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
            }

            if (locator.CountLocators() != 0)
            {
                passedTime = TimeSpan.FromMinutes(1);
                
            }
        }
    }
}
