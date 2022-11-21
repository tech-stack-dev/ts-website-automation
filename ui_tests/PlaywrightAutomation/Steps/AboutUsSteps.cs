using ChoETL;
using Contentful.Core.Models;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages.AboutUs;
using PlaywrightAutomation.Utils;
using RestSharp.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps
{

    [Binding]

    internal class AboutUsSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public AboutUsSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }


        [Then(@"Title is equals '([^']*)' and description is equals '([^']*)'")]
        public void ThenTitleIsEqualsAndDescriptionIsEquals(string titleText, string descriptionText)
        {
            var title = _page.Init<WeAreTechStackSectionPage>()
             .Title.InnerTextAsync().GetAwaiter().GetResult();
            title.Should().Be(titleText);
            var description = _page.Init<WeAreTechStackSectionPage>().Description
                .InnerTextAsync().GetAwaiter().GetResult();
            description.Should().Be(descriptionText);
        }


        [Then(@"Our achivements are correctly displayed")]
        public void ThenOurAchivementsAreCorrectlyDisplayed(Table table)
        {
            /* var values = table.CreateSet<(string Fields, string Values)>();
            List<string> listTableFields = new List<string> { };
            List<string> listTableValues = new List<string> { };
            foreach (var value in values)
            {
                var a = value.Fields;
                listTableFields.Add(a);
                var b = value.Values;
                listTableValues.Add(b);
            }

            var element = _page.Init<OurAchivementsPage>().Achivements;
            List<string> listFields = new List<string> { };
            List<string> listValues = new List<string> { };
            for (int i = 0; i < element.CountAsync().GetAwaiter().GetResult(); i++)
            {
                string titleText = element.Nth(i).Locator(_page.Init<OurAchivementsPage>().Title)
                   .InnerTextAsync().GetAwaiter().GetResult();
                listFields.Add(titleText);

                var descriptionText = element.Nth(i).Locator(_page.Init<OurAchivementsPage>().Description)
                  .InnerTextAsync().GetAwaiter().GetResult();
                listValues.Add(descriptionText);
            }
            listFields.Should().BeEquivalentTo(listTableFields);
            listValues.Should().BeEquivalentTo(listTableValues); */

            var values = table.CreateSet<(string Fields, string Values)>();
            var achivements = _page.Init<OurAchivementsPage>().Achivements;
            foreach (var achivement in achivements)
            {
                //achivement.InnerTextAsync
            }
        }


        [Then(@"Top block title is equals '([^']*)'")]
        public void ThenTopBlockTitleIsEquals(string titleText)
        {
            var topBlockTitle = _page.Init<TechstackInGrowthPage>().TopBlockTitle
                .InnerTextAsync().GetAwaiter().GetResult();
            topBlockTitle.Should().Be(titleText);
        }

        [Then(@"Main block titles are displayed")]
        public void ThenMainBlockTitlesAreDisplayed(Table table)
        {
            List<string> listTableValues = new List<string> { };

            foreach (var row in table.Rows)
            {
                foreach (string Value in row.Values)
                {
                    listTableValues.Add(Value);

                }
            }
            var element = _page.Init<TechstackInGrowthPage>().MainBlockTitles;
            List<string> listValues = new List<string> { };
            for (int i = 0; i < element.CountAsync().GetAwaiter().GetResult(); i++)
            {
                string titleText = element.Nth(i).InnerTextAsync().GetAwaiter().GetResult();
                listValues.Add(titleText);
            }
            listValues.Should().BeEquivalentTo(listTableValues);
        }


        [Then(@"Title is equals '([^']*)' and description is equals '([^']*)'\.")]
        public void ThenTitleIsEqualsAndDescriptionIsEquals_(string titleText, string descriptionText)
        {
            var title = _page.Init<TechstackInGrowthPage>()
             .Title.InnerTextAsync().GetAwaiter().GetResult();
            title.Should().Be(titleText);
            var description = _page.Init<TechstackInGrowthPage>().Description
                .InnerTextAsync().GetAwaiter().GetResult();
            description.Should().Be(descriptionText);
        }

        [Then(@"Title and description in the Techstack Roles block are displayed")]
        public void ThenTitleAndDescriptionInTheTechstackRolesBlockAreDisplayed(Table table)
        {
            var values = table.CreateSet<(string ParagraphTitle, string ParagraphDescription)>();
            var paragraphTitle = _page.Init<TechstackRolesPage>().ParagraphTitle.InnerTextAsync().GetAwaiter().GetResult();
            var paragraphDescription = _page.Init<TechstackRolesPage>().ParagraphDescription.InnerTextAsync().GetAwaiter().GetResult();

            List<string> paragraphTitleValue = new List<string> { };
            List<string> paragrahpDescriptionValue = new List<string> { };

            foreach (var value in values)
            {
                var titleText = value.ParagraphTitle;
                paragraphTitleValue.Add(titleText);
                var descriptionText = value.ParagraphDescription;
                paragrahpDescriptionValue.Add(descriptionText);

            }
            paragraphTitleValue.Should().BeEquivalentTo(paragraphTitle);
            paragrahpDescriptionValue.Should().BeEquivalentTo(paragraphDescription);

        }

        [Then(@"Content in the Techstack Roles block is displayed")]
        public void ThenContentInTheTechstackRolesBlockIsDisplayed(Table table)
        {
            var values = table.CreateSet<(string blockTitles, string textDescriptions)>();
            List<string> listTableBlockTitles = new List<string> { };
            List<string> listTableTextDescriptions = new List<string> { };
            foreach (var value in values)
            {
                var valueBlockTitles = value.blockTitles;
                listTableBlockTitles.Add(valueBlockTitles);
                var valueTextDescriptions = value.textDescriptions;
                listTableTextDescriptions.Add(valueTextDescriptions);
            }

            var blockTitle = _page.Init<TechstackRolesPage>().BlockTitle;
            List<string> listBlockTitles = new List<string> { };
            List<string> listTextDescriptions = new List<string> { };
            for (int i = 0; i < blockTitle.CountAsync().GetAwaiter().GetResult(); i++)
            {
                string titleText = blockTitle.Nth(i).InnerTextAsync().GetAwaiter().GetResult();
                listBlockTitles.Add(titleText);
            }
            var textDescription = _page.Init<TechstackRolesPage>().TextDescription;
            for (int i = 0; i < blockTitle.CountAsync().GetAwaiter().GetResult(); i++) { 
                var descriptionText = textDescription.Nth(i).InnerTextAsync().GetAwaiter().GetResult();
                listTextDescriptions.Add(descriptionText);
            }
            listBlockTitles.Should().BeEquivalentTo(listTableBlockTitles);
            listTextDescriptions.Should().BeEquivalentTo(listTableTextDescriptions);
        }

        [Then(@"Paragraph title '([^']*)' in the Engineering Culture block are displayed")]
        public void ThenParagraphTitleInTheEngineeringCultureBlockAreDisplayed(string paragraphTitle)
        {
            var paragraphTitleText = _page.Init<EngineeringCulturePage>()
                .paragraphTitle.InnerTextAsync().GetAwaiter().GetResult();
            paragraphTitleText.Should().Be(paragraphTitle);
        }

        [Then(@"Block title and text description in the Engineering Culture block are displayed")]
        public void ThenBlockTitleAndTextDescriptionInTheEngineeringCultureBlockAreDisplayed(Table table)
        {
            var values = table.CreateSet<(string blockTitle, string textDescription)>();
            List<string> listTableBlockTitles = new List<string> { };
            List<string> listTableTextDescriptions = new List<string> { };
            foreach (var value in values)
            {
                var valueBlockTitle = value.blockTitle;
                listTableBlockTitles.Add(valueBlockTitle);
                var valueTextDescription = value.textDescription;
                listTableTextDescriptions.Add(valueTextDescription);
            }
            var blockTitle = _page.Init<EngineeringCulturePage>().blockTitle;
            List<string> listBlockTitles = new List<string> { };
            List<string> listTextDescriptions = new List<string> { };
            for (int i = 0; i < blockTitle.CountAsync().GetAwaiter().GetResult(); i++)
            {
                string titleText = blockTitle.Nth(i).InnerTextAsync().GetAwaiter().GetResult();
                listBlockTitles.Add(titleText);
            }
            var textDescription = _page.Init<EngineeringCulturePage>().textDescription;
            for (int i = 0; i < blockTitle.CountAsync().GetAwaiter().GetResult(); i++)
            {
                var descriptionText = textDescription.Nth(i).InnerTextAsync().GetAwaiter().GetResult();
                listTextDescriptions.Add(descriptionText);
            }
            listBlockTitles.Should().BeEquivalentTo(listTableBlockTitles);
            listTextDescriptions.Should().BeEquivalentTo(listTableTextDescriptions);


        }



        [Then(@"Title is equals '([^']*)'")]
        public void ThenTitleIsEquals(string titleText)
        {

            var title = _page.Locator(_page.Init<ApplyTitlePage>().Container)
                .InnerTextAsync().GetAwaiter().GetResult();
            char lastSign = '?';
            int indexOfLastSign = title.IndexOf(lastSign);
            title = title.Substring(0, indexOfLastSign + 1);
            title.Should().Be(titleText);
        }

        [Then(@"Section numbers are displayed")]
        public void ThenSectionNumbersAreDisplayed(Table table)
        {
            var values = table.CreateSet<(string Blocks, string Numbers)>();
            List<string> listTableNumbers = new List<string> { };
            foreach (var row in table.Rows)
            {
                foreach (string Value in row.Values)
                {
                    listTableNumbers.Add(Value);

                }
            }
            var element = _page.Init<SecsionNumberPage>().SecsionNumber;
            List<string> listNumberss = new List<string> { };
            for (int i = 0; i < element.CountAsync().GetAwaiter().GetResult(); i++)
            {
                string numbers = element.Nth(i).InnerTextAsync().GetAwaiter().GetResult();
                listNumberss.Add(numbers);
            }
            listNumberss.Should().BeEquivalentTo(listTableNumbers);
        }

    }
}



 




