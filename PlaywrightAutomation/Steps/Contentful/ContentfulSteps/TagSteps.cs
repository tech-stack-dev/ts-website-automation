using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using AutomationUtils.Extensions;
using Contentful.Core;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.Providers;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using static PlaywrightAutomation.Models.Contentful.ContentfulTag;
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
            var rows = new List<KeyValuePair<TagPrefix, string>>();

            foreach(var row in table.Rows)
            {
                var prefix = EnumExtensions.Parse<TagPrefix>(row.Values.First());
                var content = row.Values.Last();
            }

            foreach (var tagJobs in tag)
            {
                var createdTag = _contentfulClient.CreateTag(tagJobs).Result;

                _createdTag.Value.Add(createdTag);
            }
        }
    }
}
