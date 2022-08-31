using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Playwright;
using PlaywrightAutomation.Utils.BrowserFactoryUtils;

namespace PlaywrightAutomation.Utils
{
    internal class BrowserFactory : IBrowserFactory
    {
        public BrowserFactory()
        {
            Browsers = new List<IBrowser>();
            Pages = new List<KeyValuePair<IBrowser, List<IPage>>>();
        }

        public IPlaywright PlaywrightInstance { get; set; }
        public List<IBrowser> Browsers { get; set; }

        private IBrowser _browser;
        public IBrowser Browser
        {
            get
            {
                if (_browser is not null) return _browser;

                _browser = PlaywrightInstance.Chromium.LaunchAsync().Result;
                Browsers.Add(_browser);
                return _browser;
            }
        }

        public List<KeyValuePair<IBrowser, List<IPage>>> Pages { get; set; }

        public IPage Page { get; set; }

        public async void InitLocalBrowser()
        {
            var options = new BrowserTypeLaunchOptions()
            {
                Headless = false
            };

            _browser = PlaywrightInstance.Chromium.LaunchAsync(options).GetAwaiter().GetResult();
            Browsers.Add(_browser);
        }

        public async Task<IPage> OpenNewPage(string url)
        {
            var page = await Browser.NewPageAsync();
            await page.GotoAsync(url);
            Page = page;
            return Page;
        }
    }
}
