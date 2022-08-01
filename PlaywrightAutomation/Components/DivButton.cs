
namespace PlaywrightAutomation.Components
{
    internal class DivButton : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'{Identifier}Button')]";
            return selector;
        }
    }
}
