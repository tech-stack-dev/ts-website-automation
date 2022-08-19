namespace PlaywrightAutomation.Components.FilterListWrapper
{
    internal class ActiveTagsGroupWrapper : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = "//div[contains(@class,'styledComponents__ActiveTagsGroupWrapper')]";
            return selector;
        }
    }
}
