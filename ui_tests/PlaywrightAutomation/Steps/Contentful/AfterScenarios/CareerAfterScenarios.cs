using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using System.Linq;
using AutomationUtils.Utils;
using System;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    public class CareerAfterScenarios : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareer _createdCareer;

        public CareerAfterScenarios(ContentfulClient contentfulClient, CreatedCareer createdCareer)
        {
            _contentfulClient = contentfulClient;
            _createdCareer = createdCareer;
        }

        [AfterScenario("Cleanup", Order = 5)]
        public void UnpublishAndDeleteCreatedCareer()
        {
            if (!_createdCareer.Value.Any())
                return;

            foreach (var career in _createdCareer.Value)
            {
                try
                {
                    _contentfulClient.UnpublishCareer(career).GetAwaiter().GetResult();
                }
                catch (Exception e)
                {
                    Logger.Write($"Error unpublishing '{career.NameUs}' career: {e}", Logger.LogLevel.Warning);
                }

                try
                {
                    _contentfulClient.DeleteCareer(career).GetAwaiter().GetResult();
                }
                catch (Exception e)
                {
                    Logger.Write($"Error deleting '{career.NameUs}' career: {e}", Logger.LogLevel.Warning);
                }
            }
        }
    }
}
