namespace PlaywrightAutomation.Components
{
    // Rework component after developers add data-id
    public class Link : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//img[@class='arrow']";
            return selector;
        }
    }
}
