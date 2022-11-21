using System;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace PlaywrightAutomation
{
    [Binding]
    public class AboutUsStepDefinitions
    {
        [When(@"User tests table")]
        public void WhenUserTestsTable(Table table)
        {
            var values = table.CreateSet<(string title, string description)>();
            foreach (var value in values)
            {
                var a = value.title;
                var b = value.description;
            }
        }
    }
}
