using System.Threading.Tasks;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    public class GooglePage : BasePageObject
    {
        public override string PagePath => "https://www.google.com/";
        public override IPage Page { get; set; }
        public override IBrowser Browser { get; }

        public async Task ClickSearchButton() => await Page.ClickAsync(".vcVZ7d");

        public GooglePage(IBrowser browser)
        {
            Browser = browser;
        }
    }
}
