using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components.Cards
{
    public class CaseCard : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//a[@data-id='CaseCard-CaseItemName']";
            return selector;
        }

        public string CardName => "//div[@class='case-card-name']";
    }
}
