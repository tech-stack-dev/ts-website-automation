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
        private readonly SelectedTagsList _selectedTags;

        public DropdownComponentSteps(BrowserFactory browserFactory, SelectedTagsList selectedTags)
        {
            _page = browserFactory.Page;
            _selectedTags = selectedTags;
        }

        [When(@"User selects '([^']*)' vacancy from '([^']*)' dropdown")]
        public void WhenUserSelectsVacancyFromDropdown(string tag, string dropdown)
        {
            _page.Component<Tag>(tag, new Properties { Parent = _page.Component<Dropdown>(dropdown)
                .PathToTags }).ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User clicks on '([^']*)' available tag from '([^']*)' dropdown")]
        public void WhenUserClicksOnAvailableTagFromDropdown(int numberTags, string dropdown)
        {
            var tagsList = _page.Component<Tag>(new Properties
                { Parent = _page.Component<Dropdown>(dropdown).PathToTags });

            for (int i = 0; i < numberTags; i++)
            {
                tagsList.Nth(i).ClickAsync().GetAwaiter().GetResult();
                var attribute = tagsList.Nth(i).GetAttributeAsync("class").GetAwaiter().GetResult()
                    .Contains("active-tag");
                if (attribute)
                {
                    _selectedTags.Value.Add(tagsList.Nth(i).TextContentAsync().GetAwaiter().GetResult());
                }
                else
                {
                    numberTags++;
                }
            }
        }

        [When(@"User selects tag from '([^']*)' dropdown")]
        public void WhenUserSelectsTagFromDropdown(string dropdown, Table table)
        {
            var tags = table.Rows.SelectMany(row => row.Values.ToList());

            foreach (var vacancyName in tags)
            {
                _page.Component<Tag>(vacancyName, new Properties { Parent = _page.Component<Dropdown>(dropdown)
                    .PathToTags }).ClickAsync().GetAwaiter().GetResult();
            }
        }

        [When(@"User clicks on '([^']*)' dropdown")]
        public void WhenUserClicksOnDropdown(string dropdown)
        {
            _page.Component<Dropdown>(dropdown).ClickAsync().GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' tag name displayed in '([^']*)' dropdown field")]
        public void ThenTagNameDisplayedInDropdownField(string tag, string dropdown)
        {
            var textInField = _page.Component<Dropdown>(dropdown).InnerTextAsync().GetAwaiter().GetResult();
            textInField.Should().Be(tag);
        }

        [Then(@"Count of selected tags from '([^']*)' dropdown is correctly")]
        public void ThenCountOfSelectedTagsFromIsCorrectly(string dropdown)
        {
            var selectedTags = _page.Component<Tag>().ActiveTagsIntoDropdown.CountAsync().GetAwaiter().GetResult();
            var counterTags = int.Parse(_page.Component<Dropdown>(dropdown).ActiveTagsCounter.TextContentAsync()
                .GetAwaiter()
                .GetResult());
            selectedTags.Should().Be(counterTags);
        }
    }
}
