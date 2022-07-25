using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightAutomation.Components
{
    internal class DivButton : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//div[contains(@data-id,'{Identifier}Button')]";
            return selector;
        }
    }
}
