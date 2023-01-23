using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace PlaywrightAutomation.Steps.Contentful.ContentfulSteps
{
    [Binding]
    internal class TagSteps
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedTags _createdTags;

        public TagSteps(ContentfulClient contentfulClient, CreatedTags createdTags)
        {
            _contentfulClient = contentfulClient;
            _createdTags = createdTags;
        }

        [Given(@"User creates tag")]
        public void GivenUserCreatesTag(Table table)
        {
            var tag = table.CreateSet<ContentfulTag>();

            foreach (var tagJobs in tag)
            {
                var createdTag = _contentfulClient.CreateTag(tagJobs).Result;
                _createdTags.Value.Add(createdTag);
            }
        }

        [Given(@"User creates tag with default values")]
        public void GivenUserCreatesTagWithDefaultValues(Table table)
        {
            var tag = table.CreateSet<ContentfulTag>();

            foreach (var tagJobs in tag)
            {
                tagJobs.FillWithDefaultData();
                var createdTag = _contentfulClient.CreateTag(tagJobs).Result;

                _createdTags.Value.Add(createdTag);
            }
        }
    }
}