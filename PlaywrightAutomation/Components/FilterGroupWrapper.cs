using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    internal class FilterGroupWrapper : BaseWebComponent
    {
        public override string Construct()
        {
            // TODO Ask Front-End team to add data-id
            var selector = $"//div[contains(text(),'{Identifier}')]//ancestor::div[contains(@class,'styledComponents__FilterGroupWrapper')]";
            return selector;
        }
    }
}
