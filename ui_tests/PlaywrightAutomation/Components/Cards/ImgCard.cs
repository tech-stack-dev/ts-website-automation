namespace PlaywrightAutomation.Components.Cards
{
    public class ImgCard : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//div[@class='img-card']";
            return selector;
        }

        public string ImgCardTitle => "//div[@class='img-card-title']";
    }
}
