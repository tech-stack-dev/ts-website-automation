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
    internal class InputFieldComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly VacancyList _position;

        public InputFieldComponentSteps(BrowserFactory browserFactory, VacancyList position)
        {
            _page = browserFactory.Page;
            _position = position;
        }

        [When(@"User set '([^']*)' text to '([^']*)' input")]
        public void WhenUserSetTextToInput(string text, string input)
        {
            _page.Component<FieldInput>(input, new Properties { Parent = _page.Init<HomePage>().Container })
                .FillAsync(text).GetAwaiter().GetResult();
        }

        [When(@"User set first vacancy from page to '([^']*)' input")]
        public void WhenUserSetFirstVacancyFromPageToInput(string input)
        {
            var vacancyName = _page.Component<Card>().CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
                .First();
            _position.Value.Add(vacancyName);
            _page.Component<FieldInput>(input, new Properties { Parent = _page.Init<HomePage>().Container }).FillAsync(vacancyName).GetAwaiter().GetResult();
        }

        [When(@"User set part of the name first vacancy from page to '([^']*)' input")]
        public void WhenUserSetPartOfTheNameFirstVacancyFromPageToInput(string input)
        {
            var vacancyName = _page.Component<Card>().CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult()
                .First();
            var partName = Regex.Match(vacancyName, @"^([\w\-]+)");
            _position.Value.Add(partName.Value);
            _page.Component<FieldInput>(input, new Properties { Parent = _page.Init<HomePage>().Container })
                .FillAsync(partName.Value).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' text is displayed in '([^']*)' input")]
        public void ThenTextIsDisplayedInInput(string text, string input)
        {
            var inputElement =
                _page.Component<FieldInput>(input, new Properties() { Parent = _page.Init<HomePage>().Container })
                .ElementHandleAsync().GetAwaiter().GetResult();

            _page.WaitForElementText(inputElement, text);

            inputElement.GetValue()
                .Should().Be(text);
        }
    }
}
