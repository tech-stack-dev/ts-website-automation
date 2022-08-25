using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
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

        [When(@"User creates new Career")]
        public void WhenUserCreatesNewCareer(Table table)
        {
            var career = table.CreateSet<Career>();

            foreach (var careerJob in career)
            {
                var createdCareer = _contentfulClient.CreateCareer(careerJob).Result;

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
