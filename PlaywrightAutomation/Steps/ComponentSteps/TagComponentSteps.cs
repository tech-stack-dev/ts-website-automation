using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Components.FilterListWrapper;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.UnitTests;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps.ComponentSteps
{
    internal class TagComponentSteps : SpecFlowContext
    {
        private readonly IPage _page;

        public TagComponentSteps(BrowserFactory browserFactory)
        {
            _page = browserFactory.Page;
        }

        #region General

        [Then(@"All selected tags was cancel")]
        public void ThenAllSelectedTagsWasCancel()
        {
            var selectedTags = _page.Component<Tag>().ActiveTagsIntoDropdown.AllTextContentsAsync().GetAwaiter()
                .GetResult();
            selectedTags.Should().BeEmpty();
        }

        #endregion

        #region ActiveTagsGroup

        [Then(@"Selected tags are displayed as active in Filters list on '([^']*)' container")]
        public void ThenSelectedTagsAreDisplayedAsActiveInFiltersListOnContainer(string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

            var parent = _page
                .Component<ActiveTagsGroupWrapper>(new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new BaseWebComponent.Properties { Parent = parent });

                var tagDisplayedState = tag.IsVisibleAsync().GetAwaiter().GetResult();
                tagDisplayedState.Should().BeTrue();
            }
        }

        // TODO review this step
        [Then(@"Selected tags has correct color in Filters list on '([^']*)' container")]
        public void ThenSelectedTagsHasCorrectColorInFilterListOnContainer(string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

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

        // TODO move to tags component steps
        // TODO sight bar - > filter side bar
        [Then(@"Selected tags are displayed in '([^']*)' filter side bar on '([^']*)' container")]
        public void ThenSelectedTagsAreDisplayedInFilterSideBarOnContainer(string filterGroupHeader, string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

            var parent = _page
                .Component<FilterGroupWrapper>(filterGroupHeader, new Properties { ParentSelector = WebContainer.GetLocator(container) });

            foreach (var name in tagsName)
            {
                var tag = _page.Component<Tag>(name, new Properties { Parent = parent });

                tag.SelectedState().Should().BeTrue();
            }
        }

        // TODO move to tags component steps
        // TODO sight bar - > filter side bar
        [Then(@"Selected tags from '([^']*)' filter side bar has correctly color on '([^']*)' container")]
        public void ThenSelectedTagsFromFilterSideBarHasCorrectlyColorOnContainer(string filterGroupHeader, string container, Table table)
        {
            var tagsName = table.Rows.SelectMany(x => x.Values).ToList();

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
