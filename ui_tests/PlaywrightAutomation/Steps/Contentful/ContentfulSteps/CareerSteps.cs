using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using System;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using ContentfulClient = PlaywrightAutomation.Utils.ContentfulClient;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps.Contentful.ContenrfulSteps
{
    [Binding]
    internal class CareerDescriptionSteps : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;
        private readonly CreatedCareer _createdCareer;
        private readonly CreatedTags _createdTags;
        
        public CareerDescriptionSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions, 
                                      CreatedCareer createdCareer, CreatedTags createdTags)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
            _createdCareer = createdCareer;
            _createdTags = createdTags;
        }

        [Given(@"User creates new Career with '([^']*)' career description and '([^']*)' tag")]
        public void GivenUserCreatesNewCareerWithCareerDescriptionAndTag(string careerDescriptionTitle, string tagNames, Table table)
        {
            var career = table.CreateSet<Career>();
            var careerDescription = _createdCareerDescriptions
                .Value.First(x => x.TitleUs.Equals(careerDescriptionTitle));

            var tagNamesList = tagNames.Split(',').ToList();
            var tags = _createdTags.Value.Where(x => tagNamesList.Contains(x.Name)).ToList();

            foreach (var careerJob in career)
            {
                var createdCareer = _contentfulClient.CreateCareer(careerJob, careerDescription, tags).Result;

                _createdCareer.Value.Add(createdCareer);
            }
        }

        [Given(@"User creates and publishes '([^']*)' Careers with descriptions and tags")]
        public void GivenUserCreatesAndPublishesCareersWithDescriptionsAndTags(int careerNumber)
        {
            for(int i = 0; i < careerNumber; i++)
            {
                var randomValue = Guid.NewGuid().ToString("N");

                // Create Tag
                var contentfulTag = new ContentfulTag();
                contentfulTag.FillWithDefaultData(randomValue);

                var createdTag = _contentfulClient.CreateTag(contentfulTag).Result;
                _createdTags.Value.Add(createdTag);

                List<ContentfulTag> tags = new List<ContentfulTag>();
                tags.Add(createdTag);

                // Create CareerDescription
                var careerDescription = new CareerDescription();
                careerDescription.FillWithDefaultData(randomValue);

                var createdCareerDescription = _contentfulClient.CreateCareerDescription(careerDescription).Result;
                _createdCareerDescriptions.Value.Add(createdCareerDescription);
                               
                // Create Career
                var career = new Career();
                career.FillWithDefaultData(randomValue);

                var createdCareer = _contentfulClient.CreateCareer(career, careerDescription, tags).Result;
                _createdCareer.Value.Add(createdCareer);
            }
        }
    }
}
