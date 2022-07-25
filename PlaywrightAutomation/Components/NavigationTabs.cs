namespace PlaywrightAutomation.Components
{
    public class NavigationTabs : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//button[contains(@data-id,'NavigationTab-{Identifier}')]";
            return selector;
        }
    }
}
