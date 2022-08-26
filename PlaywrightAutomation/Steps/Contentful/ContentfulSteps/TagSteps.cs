using System.Net.Http;
using Contentful.Core;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using ContentfulClient = PlaywrightAutomation.Utils.ContentfulClient;

namespace PlaywrightAutomation.Steps.Contentful.ContentfulSteps
{
    [Binding]
    internal class TagSteps
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedTag _createdTag;

        public TagSteps(ContentfulClient contentfulClient, CreatedTag createdTag)
        {
            _contentfulClient = contentfulClient;
            _createdTag = createdTag;
        }

        [When(@"User creates tag")]
        public void WhenUserCreatesTag(Table table)
        {
            var tag = table.CreateSet<TagInContentful>();

            foreach (var tagJobs in tag)
            {
                var createdTag = _contentfulClient.CreateTag(tagJobs).Result;

                _createdTag.Value.Add(createdTag);
            }
        }
    }
}
