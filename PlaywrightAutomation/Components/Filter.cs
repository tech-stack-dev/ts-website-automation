namespace PlaywrightAutomation.Components
{
    public class Filter : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Section{Identifier}')]";
            return selector;
        }
    }
}
