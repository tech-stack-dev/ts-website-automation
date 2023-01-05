namespace PlaywrightAutomation.Components.Button
{
    // Add in Button component after developers add data-id
    public class RequestAQuoteButton : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//div[contains(@id,'rq-btn')]";
            return selector;
        }
    }
}
