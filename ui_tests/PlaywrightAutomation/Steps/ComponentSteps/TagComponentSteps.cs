using System.Linq;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.FilterListWrapper;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    [Binding]
    internal class TagComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public SessionRandomValue _sessionRandom { get; }

        public TagComponentSteps(BrowserFactory browserFactory, SessionRandomValue sessionRandom)
        {
            _page = browserFactory.Page;
            _sessionRandom = sessionRandom;
        }

        #region General

        [Then(@"All selected tags was cancel")]
        public void ThenAllSelectedTagsWasCancel()
        {
            var selectedTags = _page.Component<Tag>().SelectedTags();
            selectedTags.Should().BeEmpty();
        }

        [Then(@"Number of selected tags equals to '([^']*)'")]
        public void ThenNumberOfSelectedTagsEqualsTo(int number)
        {
            var counter = int.Parse(_page.Component<Dropdown>().Locator(_page.Init<CareerPage>().ActiveTagsCounter).InnerTextAsync().GetAwaiter().GetResult());
            counter.Should().Be(number);
        }

        #endregion

        #region ActiveTagsGroup

        [Then(@"Selected tags are displayed as active in Filters list on '([^']*)' container")]
        public void ThenSelectedTagsAreDisplayedAsActiveInFiltersListOnContainer(string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList().Select(x => x.AddRandom(_sessionRandom));

            var parent = _page
                .Component<ActiveTagsGroupWrapper>(new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                var tagDisplayedState = tag.IsVisibleAsync().GetAwaiter().GetResult();
                tagDisplayedState.Should().BeTrue();
            }
        }

        [Then(@"Selected tags has correct color in Filters list on '([^']*)' container")]
        public void ThenSelectedTagsHasCorrectColorInFilterListOnContainer(string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList().Select(x => x.AddRandom(_sessionRandom));

            var parent = _page
                .Component<ActiveTagsGroupWrapper>(new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                var backgroundColor = tag.GetBackgroundColor();
                var expectedColor = ColorsConvertor.Converter("orange yellow");
                backgroundColor.Should().Be(expectedColor);
            }
        }

        #endregion

        #region SideBar

        [When(@"User selects tags in '([^']*)' filter side bar on '([^']*)' container")]
        public void WhenUserSelectsTagsInFilterSideBarOnContainer(string filterGroupHeader, string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList().Select(x => x.AddRandom(_sessionRandom));

            var parent = _page
                .Component<FilterGroupWrapper>(filterGroupHeader, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                _page.Component<Tag>(name, new Properties { Parent = parent }).ClickAsync().GetAwaiter().GetResult();
            }
        }

        [When(@"User clicks on header '([^']*)' filter sider bar on '([^']*)' container")]
        public void WhenUserClicksOnHeaderFilterSiderBarOnContainer(string filterGroup, string container)
        {
            _page.Component<FilterGroupWrapper>(filterGroup, new Properties { ParentSelector = WebContainer.GetLocator(container) }).FilterHeader.ClickAsync().GetAwaiter().GetResult();
        }

        [Then(@"'([^']*)' tags are selected in '([^']*)' sider bar on '([^']*)' container")]
        public void ThenTagsAreSelectedInSiderBarOnContainer(int count, string siderBar, string container)
        {
            var parent = _page.Component<FilterGroupWrapper>(siderBar, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            var selectedTags = _page.Component<Tag>(new Properties { Parent = parent }).SelectedTags();

            selectedTags.Count.Should().Be(count);
        }

        [Then(@"Selected tags are displayed in '([^']*)' filter side bar on '([^']*)' container")]
        public void ThenSelectedTagsAreDisplayedInFilterSideBarOnContainer(string filterGroupHeader, string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList().Select(x => x.AddRandom(_sessionRandom));

            var parent = _page
                .Component<FilterGroupWrapper>(filterGroupHeader, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                tag.SelectedState().Should().BeTrue();
            }
        }

        [Then(@"Number of selected tags in '([^']*)' side bar on '([^']*)' container equals to '([^']*)'")]
        public void ThenNumberOfSelectedTagsInSideBarOnContainerEqualsTo(string sideBar, string container, int count)
        {
            var parent = _page.Component<FilterGroupWrapper>(sideBar,
                new Properties { ParentSelector = WebContainer.GetLocator(container) });
            var counter = int.Parse(parent.Locator(_page.Init<CareerPage>().ActiveTagsCounter).InnerTextAsync()
                .GetAwaiter().GetResult());
            counter.Should().Be(count);
        }

        [Then(@"Selected tags from '([^']*)' filter side bar has correctly color on '([^']*)' container")]
        public void ThenSelectedTagsFromFilterSideBarHasCorrectlyColorOnContainer(string filterGroupHeader, string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList().Select(x => x.AddRandom(_sessionRandom));

            var parent = _page
                .Component<FilterGroupWrapper>(filterGroupHeader, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                var backgroundColor = tag.GetBackgroundColor();
                var expectedColor = ColorsConvertor.Converter("orange yellow");

                backgroundColor.Should().Be(expectedColor);
            }
        }

        #endregion
    }
}