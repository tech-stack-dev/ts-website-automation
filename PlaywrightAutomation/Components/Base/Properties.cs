using Microsoft.Playwright;
using Microsoft.VisualBasic;

namespace PlaywrightAutomation.Components.Base
{
    public class Properties
    {
        public string ParentSelector;
        public ILocator Parent;
        public TriState Displayed = TriState.True;
        public TriState Exist = TriState.UseDefault;
    }
}
