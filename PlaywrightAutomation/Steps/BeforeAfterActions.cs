using System.Threading.Tasks;
using BoDi;
using Microsoft.Playwright;
using PlaywrightAutomation.Pages;
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

            var pageObject = new GooglePage(_browserFactory.Browser);
            _objectContainer.RegisterInstanceAs(pageObject);
        }

        [AfterScenario]
        public async Task AfterScenario(IObjectContainer container)
        {
            var browser = container.Resolve<IBrowser>();
            await browser.CloseAsync();
            var pw = container.Resolve<IPlaywright>();
            pw.Dispose();
        }
    }
}
