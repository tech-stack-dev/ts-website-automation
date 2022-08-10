using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Button : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//button[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]";
            return selector;
        }
    }
}