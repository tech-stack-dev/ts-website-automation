using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class WrappedButton : BaseWebComponent
    {
        public override string Construct()
        {
            var selector =  $"//*[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]/button";
            return selector;
        }
    }
}
