namespace PlaywrightAutomation.Components.Img
{
    internal class Arrow : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//img[contains(@class,'{Identifier}')]";
            return selector;
        }

        public string NameBlockWithArrow => "//..//..//h3";
    }
}
