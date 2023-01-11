namespace PlaywrightAutomation.Components.Inputs
{
    public class InputWithName : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//input[@name='{Identifier}']";
            return selector;
        }
    }
}
