namespace PlaywrightAutomation.Components
{
    public class Label : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//label[@id='fileLabel']";
            return selector;
        }
    }
}
