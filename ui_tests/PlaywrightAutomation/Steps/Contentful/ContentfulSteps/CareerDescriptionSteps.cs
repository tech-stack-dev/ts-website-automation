using CorelAutotestsCore.DTO.RunTimeVariables;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    internal class CareerDescriptionSteps : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;
        private readonly SessionRandomValue _sessionRandom;

        public CareerDescriptionSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions, SessionRandomValue sessionRandom)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
            _sessionRandom = sessionRandom;
        }

        [Given(@"User creates and publishes new Career Description")]
        public void GivenUserCreatesAndPublishesNewCareerDescription(Table table)
        {
            var careerDescriptions = table.CreateInstance<CareerDescription>();
            careerDescriptions.FillWithDefaultData(_sessionRandom);

            var createdCareerDescriptions = _contentfulClient.CreateCareerDescription(careerDescriptions).Result;
            _createdCareerDescriptions.Value.Add(createdCareerDescriptions);
        }

        [Given(@"User creates Career Description")]
        public void GivenUserCreatesCareerDescription(Table table)
        {
            var careerDescriptions = table.CreateInstance<CareerDescription>();
            careerDescriptions.FillWithDefaultData(_sessionRandom);

            var createdCareerDescriptions = _contentfulClient.CreateCareerDescription(careerDescriptions).Result;
            _createdCareerDescriptions.Value.Add(createdCareerDescriptions);
        }

        [Given(@"User creates '([^']*)' Career Descriptions")]
        public void GivenUserCreatesCareerDescriptions(int number)
        {
            for (int index = 1; index <= number; index++)
            {
                var careerDescriptions = new CareerDescription();
                careerDescriptions.FillWithDefaultData(_sessionRandom, index);

                var createdCareerDescriptions = _contentfulClient.CreateCareerDescription(careerDescriptions).Result;
                _createdCareerDescriptions.Value.Add(createdCareerDescriptions);
            }
        }
    }
}