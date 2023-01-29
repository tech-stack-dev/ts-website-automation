using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Steps.Contentful.ContentfulSteps;
using System;
using System.Collections.Generic;
using System.Linq;
using PlaywrightAutomation.RuntimeVariables;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using PlaywrightAutomation.Utils;
using CorelAutotestsCore.DTO.RunTimeVariables;
using Contentful.Core.Models;
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
        private readonly DefaultCareersList _defaultCareersList;
        private readonly SessionRandomValue _sessionRandom;

        public CareerDescriptionSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions,
                                      CreatedCareer createdCareer, CreatedTags createdTags, DefaultCareersList defaultCareersList, SessionRandomValue sessionRandom)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
            _createdCareer = createdCareer;
            _createdTags = createdTags;
            _defaultCareersList = defaultCareersList;
            _sessionRandom = sessionRandom;
        }

        [Given(@"User creates Career")]
        public void GivenUserCreatesCareer(Table table)
        {
            var career = table.CreateInstance<Career>();
            career.FillWithDefaultData(_sessionRandom);

            var careerDescription = _createdCareerDescriptions.Value.Last();
            var tags = _createdTags.Value;

            var createdCareer = _contentfulClient.CreateCareer(career, careerDescription, tags).GetAwaiter().GetResult();
            _createdCareer.Value.Add(createdCareer);
        }

        [Given(@"User creates '([^']*)' Careers")]
        public void GivenUserCreatesCareers(int number)
        {
            for (int index = 1; index <= number; index++)
            {
                var career = new Career();
                career.FillWithDefaultData(_sessionRandom, number);

                var careerDescription = _createdCareerDescriptions.Value.ElementAt(index - 1);
                var tags = new List<ContentfulTag> { _createdTags.Value.ElementAt(index - 1) };

                var createdCareer = _contentfulClient.CreateCareer(career, careerDescription, tags).GetAwaiter().GetResult();
                _createdCareer.Value.Add(createdCareer);
            }
        }

        [Given(@"User creates Career with default value")]
        public void GivenUserCreatesCareerWithDefaultValue()
        {
            // Create Tag
            var contentfulTag = new ContentfulTag();
            contentfulTag.FillWithDefaultData(_sessionRandom);

            var createdTag = new List<ContentfulTag> { _contentfulClient.CreateTag(contentfulTag).GetAwaiter().GetResult() };
            _createdTags.Value.AddRange(createdTag);

            // Create CareerDescription
            var careerDescription = new CareerDescription();
            careerDescription.FillWithDefaultData(_sessionRandom);

            var createdCareerDescription = _contentfulClient.CreateCareerDescription(careerDescription).GetAwaiter().GetResult();
            _createdCareerDescriptions.Value.Add(createdCareerDescription);

            // Create Career
            var career = new Career();
            career.FillWithDefaultData(_sessionRandom);

            var createdCareer = _contentfulClient.CreateCareer(career, careerDescription, createdTag).GetAwaiter().GetResult();
            _createdCareer.Value.Add(createdCareer);
        }
    }
}