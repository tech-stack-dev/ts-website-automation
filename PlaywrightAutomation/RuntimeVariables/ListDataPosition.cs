using System.Collections.Generic;

namespace PlaywrightAutomation.RuntimeVariables
{
    public class ListDataPosition
    {
        public IReadOnlyList<string> Value;

        public ListDataPosition() => Value = new List<string>();
    }
}
