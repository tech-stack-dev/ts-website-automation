using System.Linq;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class DropdownComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly SessionRandomValue _sessionRandom;

        public DropdownComponentSteps(BrowserFactory browserFactory, SessionRandomValue sessionRandom)
        {
            _page = browserFactory.Page;
            _sessionRandom = sessionRandom;
        }

        [When(@"User selects tag from '([^']*)' dropdown")]
        public void WhenUserSelectsTagFromDropdown(string dropdown, Table table)
        {
            var tags = table.Rows.SelectMany(row => row.Values.ToList()).Select(x => x.AddRandom(_sessionRandom));

            foreach (var vacancyName in tags)
            {
                _page.Component<Tag>(vacancyName, new Properties
                {
                    Parent = _page.Component<Dropdown>(dropdown)
                }).ClickAsync().GetAwaiter().GetResult();
            }
        }

        [When(@"User clicks on '([^']*)' dropdown")]
        public void WhenUserClicksOnDropdown(string dropdown)
        {
            _page.Component<Dropdown>(dropdown).FiltersList.ClickAsync().GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' tag name displayed in '([^']*)' dropdown field")]
        public void ThenTagNameDisplayedInDropdownField(string tag, string dropdown)
        {
            var textInField = _page.Component<Dropdown>(dropdown)
                .FiltersList.InnerTextAsync().GetAwaiter().GetResult();
            textInField.Should().Be(tag.AddRandom(_sessionRandom));
        }

        [Then(@"'([^']*)' tags are selected in '([^']*)' dropdown")]
        public void ThenTagsAreSelectedInDropdown(int count, string dropdown)
        {
            var parent = _page.Component<Dropdown>(dropdown).ItemsList;

            var selectedTags = _page.Component<Tag>(new Properties { Parent = parent }).SelectedTags();

            selectedTags.Count.Should().Be(count);
        }
    }
}