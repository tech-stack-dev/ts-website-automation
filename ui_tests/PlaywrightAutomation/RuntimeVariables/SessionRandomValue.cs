using AutomationUtils.Utils;
using ChoETL;

namespace CorelAutotestsCore.DTO.RunTimeVariables
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