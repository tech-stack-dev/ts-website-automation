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
        private readonly CreatedTags _createdTags;

        public TagAfterScenarios(ContentfulClient contentfulClient, CreatedTags createdTags)
        {
            _contentfulClient = contentfulClient;
            _createdTags = createdTags;
        }

        [AfterScenario("Cleanup", Order = 15)]
        public void UnpublishAndDeleteCreatedTags()
        {
            if (!_createdTags.Value.Any())
                return;

            foreach (var tag in _createdTags.Value)
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
