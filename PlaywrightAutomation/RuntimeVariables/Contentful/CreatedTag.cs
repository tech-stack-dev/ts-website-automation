using System.Collections.Generic;
using PlaywrightAutomation.Models.Contentful;

namespace PlaywrightAutomation.RuntimeVariables.Contentful
{
    public class CreatedTag
    {
        public List<TagInContentful> Value { get; set; }

        public CreatedTag() => Value = new List<TagInContentful>();
    }
}
