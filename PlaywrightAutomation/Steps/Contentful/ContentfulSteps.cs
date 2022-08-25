using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using System.Linq;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using ContentfulClient = PlaywrightAutomation.Utils.ContentfulClient;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    internal class ContentfulSteps : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;
        private readonly CreatedCareer _createdCareer;

        public ContentfulSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions, CreatedCareer createdCareer)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
            _createdCareer = createdCareer;
        }

        [When(@"User creates new Career with '([^']*)' career description")]
        public void WhenUserCreatesNewCareerWithCareerDescription(string careerDescriptionTitle, Table table)
        {
            var career = table.CreateSet<Career>();
            var careerDescription = _createdCareerDescriptions
                .Value.First(x => x.TitleUs.Equals(careerDescriptionTitle));

            foreach (var careerJob in career)
            {
                var createdCareer = _contentfulClient.CreateCareer(careerJob, careerDescription).Result;

                _createdCareer.Value.Add(createdCareer);
            }
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
    }
}
