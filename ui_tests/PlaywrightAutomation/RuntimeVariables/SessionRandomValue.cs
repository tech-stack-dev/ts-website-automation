using AutomationUtils.Utils;
using ChoETL;

namespace PlaywrightAutomation.RuntimeVariables
{
    public class SessionRandomValue
    {
        //SRND
        public string RandomString { get; set; }

        public SessionRandomValue()
        {
            RandomString = TestDataGenerator.RandomString().ToUpper();
        }
    }
}