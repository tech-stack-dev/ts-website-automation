using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components.Button
{
    // For cases when button is wrapped and wrapper has data-id property
    public class WrappedButton : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]/button";
            return selector;
        }
    }
}
