using System.Collections.Generic;
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

        private IPage _page;

        public IPage Page
        {
            get
            {
                if (_page is not null) return _page;

                _page = Browser.NewPageAsync().Result;
                return _page;
            }
            set => _page = value;
        }

        public void InitLocalBrowser()
        {
            var options = new BrowserTypeLaunchOptions()
            {
                Headless = false
            };

            _browser = PlaywrightInstance.Chromium.LaunchAsync(options).Result;
            Browsers.Add(_browser);
        }

        public async void OpenNewPage(string url)
        {
            var page = await Browser.NewPageAsync();
            await page.GotoAsync(url);
            Page = page;
        }
    }
}
