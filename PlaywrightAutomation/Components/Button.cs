namespace PlaywrightAutomation.Components
{
    public class Button : BaseWebComponent
    {
        protected override string Construct()
        {
            var selector = $"//button[contains(@data-id,'{Identifier}Button')]";
            return selector;
        }
    }
}