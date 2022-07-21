
namespace PlaywrightAutomation.Components
{
    internal class FieldInput : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//input[contains(@data-id,'{Identifier}FieldInput')]";
            return selector;
        }
    }
}
