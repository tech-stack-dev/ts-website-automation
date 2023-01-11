namespace PlaywrightAutomation.Components.Img
{
    public class ImgWithId : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//img[@id='selectedFileClose']";
            return selector;
        }
    }
}
