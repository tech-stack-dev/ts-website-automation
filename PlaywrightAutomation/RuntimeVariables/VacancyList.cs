using System.Collections.Generic;

namespace PlaywrightAutomation.RuntimeVariables
{
    public class VacancyList
    {
        public IReadOnlyList<string> Value;

        public VacancyList() => Value = new List<string>();
    }
}
