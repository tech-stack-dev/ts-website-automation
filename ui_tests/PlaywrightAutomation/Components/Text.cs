namespace PlaywrightAutomation.Components
{
    public class Text : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//span[contains(@class,'{Identifier}')]";
            return selector;
        }
    }
}