using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    internal class Textarea : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//textarea[contains(@data-id,'Input-{Identifier.ToAutomationValue()}')]";
            return selector;
        }        
    }
}
