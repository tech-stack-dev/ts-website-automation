using System.Collections.Generic;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Utils.BrowserFactoryUtils
{
    public interface IBrowserFactory
    {
        public IPlaywright PlaywrightInstance { get; set; }

        public List<IBrowser> Browsers { get; set; }

        public IBrowser Browser { get; }

        public List<KeyValuePair<IBrowser, List<IPage>>> Pages { get; set; }

        public IPage Page { get; set; }
    }
}
