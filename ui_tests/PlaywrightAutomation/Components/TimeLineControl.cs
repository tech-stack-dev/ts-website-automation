namespace PlaywrightAutomation.Components
{
    public class TimeLineControl : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[@id='{Identifier}-timeline-control']";
            return selector;
        }
    }
}
