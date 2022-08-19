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

        [When(@"User clears input")]
        public void WhenUserClearsInput()
        {
            _page.Component<Input>(new Properties { Parent = _page.Init<HomePage>().Container })
                .CleanInputButton.ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User set '([^']*)' text to '([^']*)' input")]
        public void WhenUserSetTextToInput(string text, string input)
        {
            // TODO Move container name to step definition
            _page.Component<Input>(input, new Properties { Parent = _page.Init<HomePage>().Container })
                .FillAsync(text).GetAwaiter().GetResult();
            _page.WaitForLoadStateAsync(LoadState.NetworkIdle).GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' text is displayed in '([^']*)' input")]
        public void ThenTextIsDisplayedInInput(string text, string input)
        {
            // TODO Move container name to step definition
            var inputElement =
                _page.Component<Input>(input, new Properties() { Parent = _page.Init<HomePage>().Container })
                .ElementHandleAsync().GetAwaiter().GetResult();

            _page.WaitForElementText(inputElement, text);

            inputElement.GetValue()
                .Should().Be(text);
        }
    }
}
