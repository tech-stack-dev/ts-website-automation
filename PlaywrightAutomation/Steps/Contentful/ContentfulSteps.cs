using System.Collections.Generic;
using System.Net.Http;
using Contentful.Core;
using Contentful.Core.Models;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.Providers;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using ContentfulClient = PlaywrightAutomation.Utils.ContentfulClient;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    internal class ContentfulSteps : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;

        public ContentfulSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
        }

        [When(@"User creates and publish new Career Description")]
        public void WhenUserCreatesAndPublishNewCareerDescription(Table table)
        {
            var careerDescriptions = table.CreateSet<CareerDescription>();

            foreach (var career in careerDescriptions)
            {
                var createdCareer = _contentfulClient.CreateCareerDescription(career).Result;

                _createdCareerDescriptions.Value.Add(createdCareer);
            }
        }

        [When(@"User creates new Career")]
        public void WhenUserCreatesNewCareer()
        {
            var httpClient = new HttpClient();
            var client = new ContentfulManagementClient(httpClient, ContentfulProvider.ManagmentApiKey,
                ContentfulProvider.SpaceId);

            var entry = new Entry<dynamic>();
            entry.SystemProperties = new SystemProperties();
            entry.SystemProperties.Id = "TestCareer";

            /*entry.Fields = new
            {
                name = new Dictionary<string, string>()
                {
                    { "en-US", "TestCareer" },
                    { "uk-UA", "TestUA" }
                },
                careerDescription = new Dictionary<string, dynamic>()
                {
                    { "en-US", new { sys = new List<object>() {new {sys = new List<object>() {new { type = "Link", linkType = "Entry", id = "dquTR2FgqylJuz5qE4zZc" } } } }}}
                },
                description = new Dictionary<string, string>()
                {
                    { "en-US", "Small items to make you life or home complete." },
                    { "uk-UA", "TestUA" }
                }
            };*/

            entry.Fields = new
            {
                name = new Dictionary<string, string>()
                {
                    { "en-US", "TestCareer" },
                    { "uk-UA", "TestUA" }
                },
                careerDescription = new Dictionary<string, dynamic>()
                {
                    { "en-US", new {
                        sys = new List<dynamic>()
                        {
                            new {
                                type = "Link",
                                linkType= "Entry",
                                id = "dquTR2FgqylJuz5qE4zZc"
                                }
                        }, }
                    }
                },
                description = new Dictionary<string, string>()
                {
                    { "en-US", "Small items to make you life or home complete." },
                    { "uk-UA", "TestUA" }
                }
            };

            var newEntry = client.CreateOrUpdateEntry(entry, contentTypeId: "career").GetAwaiter().GetResult();
        }
    }
}
