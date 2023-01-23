using CorelAutotestsCore.DTO.RunTimeVariables;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Utils;
using System.Linq;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace PlaywrightAutomation.Steps.Contentful.ContentfulSteps
{
    [Binding]
    internal class TagSteps
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedTags _createdTags;
        private readonly SessionRandomValue _sessionRandom;

        public TagSteps(ContentfulClient contentfulClient, CreatedTags createdTags, SessionRandomValue sessionRandom)
        {
            _contentfulClient = contentfulClient;
            _createdTags = createdTags;
            _sessionRandom = sessionRandom;
        }

        [Given(@"User creates Tag")]
        public void GivenUserCreatesTag(Table table)
        {
            var tag = table.CreateInstance<ContentfulTag>();
            tag.FillWithDefaultData(_sessionRandom);
            var createdTag = _contentfulClient.CreateTag(tag).Result;
            _createdTags.Value.Add(createdTag);
        }

        [Given(@"User creates Tags")]
        public void GivenUserCreatesTags(Table table)
        {
            var tags = table.CreateSet<ContentfulTag>().ToList();

            foreach(var tag in tags)
            {
                tag.Name = tag.Name.AddRandom(_sessionRandom);

                var createdTag = _contentfulClient.CreateTag(tag).Result;
                _createdTags.Value.Add(createdTag);
            }
        }

        [Given(@"User creates '([^']*)' Tags")]
        public void GivenUserCreatesTags(int number)
        {
            for (int index = 1; index <= number; index++)
            {
                var tag = new ContentfulTag();
                tag.FillWithDefaultData(_sessionRandom, index);
                var createdTag = _contentfulClient.CreateTag(tag).Result;
                _createdTags.Value.Add(createdTag);
            }
        }

        [Given(@"User creates tag with default values")]
        public void GivenUserCreatesTagWithDefaultValues(Table table)
        {
            var tag = table.CreateSet<ContentfulTag>();

            foreach (var tagJobs in tag)
            {
                tagJobs.FillWithDefaultData(_sessionRandom);
                var createdTag = _contentfulClient.CreateTag(tagJobs).Result;

                _createdTags.Value.Add(createdTag);
            }
        }
    }
}