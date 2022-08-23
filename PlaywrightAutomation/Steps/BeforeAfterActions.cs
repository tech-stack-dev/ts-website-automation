using System.Linq;
using System.Threading.Tasks;
using BoDi;
using Microsoft.Playwright;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class BeforeAfterActions
    {
        private readonly BrowserFactory _browserFactory;
        private readonly IObjectContainer _objectContainer;

        public BeforeAfterActions(IObjectContainer objectContainer,
            BrowserFactory browserFactory)
        {
            _browserFactory = browserFactory;
            _objectContainer = objectContainer;
        }

        [BeforeScenario]
        public async Task OnStartUp()
        {
            _browserFactory.PlaywrightInstance = await Playwright.CreateAsync();
            _browserFactory.InitLocalBrowser();
        }

        [AfterScenario]
        public async Task AfterScenario(IObjectContainer container)
        {
            var browsers = _browserFactory.Browsers;
            if (browsers.Any())
            {
                foreach (IBrowser browser in browsers)
                {
                    await browser.CloseAsync();
                }
            }

            var playwright = _browserFactory.PlaywrightInstance;
            playwright.Dispose();
        }
    }
}
