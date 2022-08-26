using AutomationUtils.Utils;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Utils;
using System.Linq;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.Contentful.AfterScenarios
{
    [Binding]
    public class TagAfterScenarios
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedTag _createdTag;

        public TagAfterScenarios(ContentfulClient contentfulClient, CreatedTag createdTag)
        {
            _contentfulClient = contentfulClient;
            _createdTag = createdTag;
        }

        [AfterScenario("Cleanup", Order = 15)]
        public void UnpublishAndDeleteCreatedCareerDescriptions()
        {
            if (!_createdTag.Value.Any())
                return;

            foreach (var tag in _createdTag.Value)
            {
                try
                {
                    _contentfulClient.DeleteTag(tag);
                }
                catch
                {
                    Logger.Write($"Error deleting '{tag.Name}' career", Logger.LogLevel.Warning);
                }
            }
        }
    }
}
