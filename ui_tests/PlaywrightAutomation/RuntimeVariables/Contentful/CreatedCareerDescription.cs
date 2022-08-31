using PlaywrightAutomation.Models.Contentful;
using System.Collections.Generic;

namespace PlaywrightAutomation.RuntimeVariables.Contentful
{
    public class CreatedCareerDescription
    {
        public List<CareerDescription> Value { get; set; }

        public CreatedCareerDescription() => Value = new List<CareerDescription>();
    }
}
