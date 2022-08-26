using PlaywrightAutomation.Models.Contentful;
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
        private readonly CreatedTags _createdTags;

        public TagSteps(ContentfulClient contentfulClient, CreatedTags createdTags)
        {
            _contentfulClient = contentfulClient;
            _createdTags = createdTags;
        }

        [When(@"User creates tag")]
        public void WhenUserCreatesTag(Table table)
        {
            var tag = table.CreateSet<ContentfulTag>();

            foreach (var tagJobs in tag)
            {
                var createdTag = _contentfulClient.CreateTag(tagJobs).Result;

                _createdTags.Value.Add(createdTag);
            }
        }
    }
}
