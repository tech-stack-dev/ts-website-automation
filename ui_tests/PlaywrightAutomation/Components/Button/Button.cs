namespace PlaywrightAutomation.Components.Button
{
    public class Button : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//*[contains(@data-id,'{Identifier}Button')]";
            return selector;
        }
    }
}