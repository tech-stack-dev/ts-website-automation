using System.Collections.Generic;
using PlaywrightAutomation.Models.Contentful;

namespace PlaywrightAutomation.RuntimeVariables.Contentful
{
    public class CreatedCareer
    {
        public List<Career> Value { get; set; }

        public CreatedCareer() => Value = new List<Career>();
    }
}
