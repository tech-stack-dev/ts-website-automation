using System.Collections.Generic;
using PlaywrightAutomation.Models.Contentful;

namespace PlaywrightAutomation.RuntimeVariables.Contentful
{
    public class CreatedTags
    {
        public List<ContentfulTag> Value { get; set; }

        public CreatedTags() => Value = new List<ContentfulTag>();
    }
}
