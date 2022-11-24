using Microsoft.Playwright;
using System.Threading;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Timers;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Utils.Waiters
{
    public class CustomWaiter
    {
        //private Task? _timerTask;
        //private readonly PeriodicTimer _timer;
        //private readonly CancellationTokenSource _cts = new();

        //public CustomWaiter(TimeSpan interval)
        //{
        //    _timer = new PeriodicTimer(interval);
        //}

        //public void Start(IPage page, ILocator locator)
        //{
        //    _timerTask = DoWorkAsync(page, locator);
        //}

        //private async Task DoWorkAsync(IPage page, ILocator locator)
        //{
        //    try
        //    {
        //        while (await _timer.WaitForNextTickAsync(_cts.Token))
        //        {
        //            WaiterWithReloadPage(page, locator);
        //        }
        //    }
        //    catch (OperationCanceledException)
        //    {
        //    }
        //}


        //public async Task StopAsync()
        //{
        //    if (_timerTask is null)
        //    {
        //        return;
        //    }
            
        //    _cts.Cancel();
        //    await _timerTask;
        //    _cts.Dispose();
        //}

        public void WaiterWithReloadPage(IPage page, ILocator locator)
        {
            using var timer = new System.Timers.Timer(5000);
            DateTime dt = DateTime.Now;
            TimeSpan passedTime = default;
            timer.Elapsed += (source, e) => OnTimeEvent(source, e, page, locator, dt, ref passedTime);
            timer.AutoReset = true;
            timer.Enabled = true;
            while (passedTime < TimeSpan.FromMinutes(1)) ;
            timer.Dispose();
            throw new Exception("Timeout 60000ms exceeded.");

            //var timer = new System.Timers.Timer(5000);
            //DateTime dt = DateTime.Now;
            //timer.Elapsed += (source, e) => OnTimeEvent(source, e, page, locator, ref dt);
            //timer.AutoReset = true;
            //timer.Enabled = true;
            //while (timer.Enabled);
        }

        private void OnTimeEvent(object source, ElapsedEventArgs e, IPage page, ILocator locator, DateTime dt, ref TimeSpan passedTime)
        {
            passedTime = e.SignalTime - dt;
            if (locator.CountLocators() == 0)
            {
                page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
            }

            if (locator.CountLocators() != 0)
            {

            }

            //if (passedTime > TimeSpan.FromMinutes(1))
            //{
            //    var timer = (System.Timers.Timer) source;
            //    timer.AutoReset = false;
            //    timer.Enabled = false;
            //    timer.Dispose();
            //    throw new Exception("Vacancy is not exist");
            //}
        }
    }
}
