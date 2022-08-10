using System.Linq;
using System.Text.RegularExpressions;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]

    internal class FieldInputComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly VacancyList _position;

        public FieldInputComponentSteps(BrowserFactory browserFactory, VacancyList position)
        {
            _page = browserFactory.Page;
            _position = position;
        }

        [When(@"User set '([^']*)' text to '([^']*)' by role field")]
        public void WhenUserSetTextToByRoleField(string text, string fieldName)
        {
            _page.Component<FieldInput>(fieldName, new Properties()
            {
                Parent = _page.Init<HomePage>().Container
            }).FillAsync(text).GetAwaiter().GetResult();
        }

        [When(@"User set first vacancy from page in '([^']*)' by role field")]
        public void WhenUserSetFirstVacancyFromPageInByRoleField(string fieldName)
        {
            string vacancyName = _page.Component<Card>("").CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
                .First();
            _position.Value.Add(vacancyName);
            _page.Component<FieldInput>(fieldName, new Properties
            {
                Parent = _page.Init<
                    HomePage>().Container
            }).FillAsync(vacancyName).GetAwaiter().GetResult();
        }

        [When(@"User set part of the name first vacancy from page in '([^']*)' by role field")]
        public void WhenUserSetPartOfTheNameFirstVacancyFromPageInByRoleField(string fieldName)
        {
            string vacancyName = _page.Component<Card>("").CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
                .First();
            var partName = Regex.Match(vacancyName, @"^([\w\-]+)");
            _position.Value.Add(partName.Value);
            _page.Component<FieldInput>(fieldName, new Properties() { Parent = _page.Init<HomePage>().Container })
                .FillAsync(partName.Value).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' by role field is empty")]
        public void ThenByRoleFieldIsEmpty(string fieldName)
        {
            var textInSearchField =
                _page.Component<FieldInput>(fieldName, new Properties() { Parent = _page.Init<HomePage>().Container })
                    .GetAttributeAsync("value").GetAwaiter().GetResult();
            string.Empty.Should().Be(textInSearchField);
        }
    }
}
