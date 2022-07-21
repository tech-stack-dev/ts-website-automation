using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public class BaseWebComponent
    {
        public IPage Page { get; set; }
        public string Identifier { get; set; }
        public ILocator Instance { get; set; }

        public virtual string Construct()
        {
            return Identifier;
        }

        public void Build()
        {
            Instance = Page.Locator(Construct());
        }
    }
}
