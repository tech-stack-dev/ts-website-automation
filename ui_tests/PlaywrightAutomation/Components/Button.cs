using System.Linq;
using System.Threading.Tasks;
using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Button : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//*[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]";
            return selector;
        }

        public async Task SelectLanguage(string language)
        {
            var switcher = (await Instance.ElementHandlesAsync())
                .First(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(language));
            await switcher.ClickAsync();

            await Page
                .WaitForFunctionAsync("switcher => switcher.getAttribute('class').includes('active-locale')", switcher);
        }

        public async Task<string> GetSelectedLanguage()
        {
            var selectedSwitcher = (await Instance.ElementHandlesAsync())
                .First(x => x.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-locale"));
            return await selectedSwitcher.InnerTextAsync();
        }
    }
}