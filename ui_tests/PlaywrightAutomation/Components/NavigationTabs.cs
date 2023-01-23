namespace PlaywrightAutomation.Components
{
    public class NavigationTabs : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//a[contains(@class, 'button') and contains(@data-id,'NavigationTab-{Identifier}')]";
            return selector;
        }

        public bool IsActive { get => Instance.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-nav-tab"); }
    }
}