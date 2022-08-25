using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using ContentfulClient = PlaywrightAutomation.Utils.ContentfulClient;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    internal class CareerDescriptionSteps : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;

        public CareerDescriptionSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions)
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
    }
}
