using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class NavigationTabs : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//button[contains(@data-id,'NavigationTab-{Identifier.ToAutomationValue()}')]";
            return selector;
        }

        public bool IsActive { get => Instance.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-nav-tab"); }
    }
}