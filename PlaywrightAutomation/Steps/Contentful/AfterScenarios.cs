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
        private readonly CreatedCareer _createdCareer;

        public AfterScenarios(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions, CreatedCareer createdCareer)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
            _createdCareer = createdCareer;
        }

        [AfterScenario("Cleanup")]
        public void UnpublishAndDeleteCreatedCareerDescriptionsAndCareer()
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

            if (!_createdCareer.Value.Any())
                return;

            foreach (var career in _createdCareer.Value)
            {
                try
                {
                    _contentfulClient.UnpublishCareer(career);
                }
                catch
                {
                    Logger.Write($"Error unpublishing '{career.NameUs}' career", Logger.LogLevel.Warning);
                }

                try
                {
                    _contentfulClient.DeleteCareer(career);
                }
                catch
                {
                    Logger.Write($"Error deleting '{career.NameUs}' career", Logger.LogLevel.Warning);
                }
            }
        }
    }
}
