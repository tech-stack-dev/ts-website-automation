using System.Linq;
using System.Text.RegularExpressions;
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
        public void WhenUserSelectsVacancyFromDropdown(string tagName, string dropdownName)
        {
            _page.Component<Tag>(tagName, new Properties { Parent = _page.Component<Dropdown>(dropdownName).PathToTags() }).ClickAsync().GetAwaiter().GetResult();
        }

        [When(@"User clicks on '([^']*)' available tag from '([^']*)' dropdown")]
        public void WhenUserClicksOnAvailableTagFromDropdown(int numberTags, string dropdownName)
        {
            var tagsList = _page.Component<Tag>("", new Properties
                { Parent = _page.Component<Dropdown>(dropdownName).PathToTags() });

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
        public void WhenUserSelectsTagFromDropdown(string dropdownName, Table table)
        {
            var tags = table.Rows.Select(row => row.Values.FirstOrDefault()).ToList();

            foreach (var vacancyName in tags)
            {
                _page.Component<Tag>(vacancyName, new Properties { Parent = _page.Component<Dropdown>(dropdownName).PathToTags() }).ClickAsync().GetAwaiter().GetResult();
            }
        }

        [When(@"User clicks on '([^']*)' dropdown")]
        public void WhenUserClicksOnDropdown(string dropdownName)
        {
            _page.Component<Dropdown>(dropdownName).ClickAsync().GetAwaiter().GetResult();
        }

        [Then(@"Tag name displayed in '([^']*)' dropdown field")]
        public void ThenTagNameDisplayedInDropdownField(string dropdownName)
        {
            var textInField = _page.Component<Dropdown>(dropdownName).InnerTextAsync().GetAwaiter().GetResult();
            var selectedTags = _selectedTags.Value.Select(x => Regex.Matches(x, @"^[a-zA-Z\s]+\b"));
            var selectedTag = selectedTags.SelectMany(x => x).Select(x => x.Value).ToList().First();
            selectedTag.Should().Be(textInField);
        }

        [Then(@"Count of selected tags from '([^']*)' is correctly")]
        public void ThenCountOfSelectedTagsFromIsCorrectly(string dropdownName)
        {
            var selectedTags = _page.Component<Tag>("").SelectedTagsList().CountAsync().GetAwaiter().GetResult();
            var counterTags = int.Parse(_page.Component<Dropdown>(dropdownName).ActiveTagsCounter().TextContentAsync()
                .GetAwaiter()
                .GetResult());
            selectedTags.Should().Be(counterTags);
        }
    }
}
