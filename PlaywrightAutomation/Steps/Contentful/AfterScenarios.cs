using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using System.Linq;
using AutomationUtils.Utils;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    public class AfterScenarios : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;

        public AfterScenarios(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
        }

        [AfterScenario("Cleanup")]
        public void UnpublishAndDeleteCreatedCareerDescriptions()
        {
            if (!_createdCareerDescriptions.Value.Any())
                return;

            foreach (var career in _createdCareerDescriptions.Value)
            {
                try
                {
                    _contentfulClient.UnpublishCareerDescription(career);
                }
                catch
                {
                    Logger.Write($"Error unpublishing '{career.TitleUs}' career", Logger.LogLevel.Warning);
                }

                try
                {
                    _contentfulClient.DeleteCareerDescription(career);
                }
                catch
                {
                    Logger.Write($"Error deleting '{career.TitleUs}' career", Logger.LogLevel.Warning);
                }
            }
        }
    }
}
