using PlaywrightAutomation.Utils;
using PlaywrightAutomation.Models.Contentful;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using PlaywrightAutomation.RuntimeVariables.Contentful;

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

        [When(@"User creates new Career Description")]
        public void WhenUserCreatesNewCareerDescription(Table table)
        {
            var careerDescriptions = table.CreateSet<CareerDescription>();

            foreach (var career in careerDescriptions)
            {
                var id = _contentfulClient.CreateCareerDescription(career).Result;

                _createdCareerDescriptions.Value.Add(id);
            }
        }

    }
}
