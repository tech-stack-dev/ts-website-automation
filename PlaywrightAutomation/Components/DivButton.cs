using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    internal class DivButton : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]";
            return selector;
        }
    }
}