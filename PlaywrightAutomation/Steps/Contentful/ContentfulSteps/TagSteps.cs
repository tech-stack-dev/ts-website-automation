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
        private readonly CreatedTags _createdTag;

        public TagSteps(ContentfulClient contentfulClient, CreatedTags createdTag)
        {
            _contentfulClient = contentfulClient;
            _createdTag = createdTag;
        }

        [When(@"User creates tag")]
        public void WhenUserCreatesTag(Table table)
        {
            var tag = table.CreateSet<ContentfulTag>();

            foreach (var tagJobs in tag)
            {
                var createdTag = _contentfulClient.CreateTag(tagJobs).Result;

                _createdTag.Value.Add(createdTag);
            }
        }
    }
}
