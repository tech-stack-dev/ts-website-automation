using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components.Button
{
    public class Button : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//*[contains(@data-id,'{Identifier.ToAutomationValue()}') and contains(@data-id, 'Button')]";
            return selector;
        }
    }
}