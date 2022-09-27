using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    // Use if button without data-id is contained inside wrapper with data-id
    public class WrappedButton : BaseWebComponent
    {
        public override string Construct()
        {
            var selector =  $"//*[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]/button";
            return selector;
        }
    }
}
