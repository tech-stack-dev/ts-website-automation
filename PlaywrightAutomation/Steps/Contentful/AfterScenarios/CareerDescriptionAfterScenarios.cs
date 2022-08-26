using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using System.Linq;
using AutomationUtils.Utils;
using System;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    public class CareerDescriptionAfterScenarios : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;

        public CareerDescriptionAfterScenarios(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
        }

        [AfterScenario("Cleanup", Order = 10)]
        public void UnpublishAndDeleteCreatedCareerDescriptions()
        {
            if (!_createdCareerDescriptions.Value.Any())
                return;

            foreach (var careerDescription in _createdCareerDescriptions.Value)
            {
                try
                {
                    _contentfulClient.UnpublishCareerDescription(careerDescription).GetAwaiter().GetResult();
                }
                catch (Exception e)
                {
                    Logger.Write($"Error unpublishing '{careerDescription.TitleUs}' career: {e}", Logger.LogLevel.Warning);
                }

                try
                {
                    _contentfulClient.DeleteCareerDescription(careerDescription).GetAwaiter().GetResult();
                }
                catch (Exception e)
                {
                    Logger.Write($"Error deleting '{careerDescription.TitleUs}' career: {e}", Logger.LogLevel.Warning);
                }
            }
        }
    }
}
