using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace PlaywrightAutomation.Components
{
    public class Tag : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'Tag-{Identifier.ToAutomationValue()}')]";
            return selector;
        }

        public bool SelectedState()
        {
            return ElementSelectedState(Instance.ElementHandleAsync().Result);
        }

        public List<IElementHandle> SelectedTags()
        {
            var tagClass = Instance
                .ElementHandlesAsync().Result
                .Where(x => ElementSelectedState(x))
                .ToList();

            return tagClass;
        }

        private bool ElementSelectedState(IElementHandle element)
        {
            return element.GetAttributeAsync("class").Result.Contains("active-tag");
        }
    }
}
