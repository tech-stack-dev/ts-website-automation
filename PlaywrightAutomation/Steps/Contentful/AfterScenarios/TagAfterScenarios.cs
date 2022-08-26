using AutomationUtils.Utils;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Utils;
using System;
using System.Linq;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps.Contentful.AfterScenarios
{
    [Binding]
    public class TagAfterScenarios
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedTags _createdTag;

        public TagAfterScenarios(ContentfulClient contentfulClient, CreatedTags createdTag)
        {
            _contentfulClient = contentfulClient;
            _createdTag = createdTag;
        }

        [AfterScenario("Cleanup", Order = 15)]
        public void UnpublishAndDeleteCreatedTags()
        {
            if (!_createdTag.Value.Any())
                return;

            foreach (var tag in _createdTag.Value)
            {
                try
                {
                    _contentfulClient.DeleteTag(tag).GetAwaiter().GetResult();
                }
                catch (Exception e)
                {
                    Logger.Write($"Error deleting '{tag.Name}' tag: {e}", Logger.LogLevel.Warning);
                }
            }
        }
    }
}
