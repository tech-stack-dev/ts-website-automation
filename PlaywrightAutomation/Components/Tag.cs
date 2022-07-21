
namespace PlaywrightAutomation.Components
{
    public class Tag : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Tag-{Identifier}')]";
            return selector;
        }
    }
}
