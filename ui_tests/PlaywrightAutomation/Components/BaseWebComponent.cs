using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Components
{
    public abstract class BaseWebComponent : ILocator
    {
        public IPage Page { get; set; }

        public class Properties
        {
            public string ParentSelector;
            public ILocator Parent;
        }

        public Properties Props = new Properties();

        protected ILocator Component;

        public virtual void CheckAutomationClass() { }

        public abstract string Construct();

        public void Build()
        {
            if (Props.ParentSelector is not null && Props.Parent is not null)
            {
                throw new Exception("Not allowed to use Parent element selector and Parent element together");
            }

            ParentSelector = Props.ParentSelector;
            Parent = Props.Parent;

            #region Parent element

            if (Props.ParentSelector is not null)
            {
                if (Page.Locator(ParentSelector).ElementHandlesAsync().Result.Count > 0)
                {
                    Parent = Page.Locator(ParentSelector);
                }
                else
                {
                    throw new Exception($"Parent element with '{ParentSelector}' locator is not present");
                }
            }

            try
            {
                CheckAutomationClass();
            }
            catch { }

            #endregion

            var selector = Construct();
            Component = Parent is null ? Page.Locator(selector) : Parent.Locator(selector);
        }

        public ILocator Instance => Component;

        public string Identifier { get; set; }

        private string ParentSelector { get; set; }

        private ILocator Parent { get; set; }

        public ILocator First => Component.First;

        public ILocator Last => Component.Last;

        #region Implementation

        public Task<IReadOnlyList<ILocator>> AllAsync()
        {
            return Component.AllAsync();
        }

        public Task<IReadOnlyList<string>> AllInnerTextsAsync()
        {
            return Component.AllInnerTextsAsync();
        }

        public Task<IReadOnlyList<string>> AllTextContentsAsync()
        {
            return Component.AllTextContentsAsync();
        }

        public Task BlurAsync(LocatorBlurOptions options = null)
        {
            return Component.BlurAsync(options);
        }

        public Task<LocatorBoundingBoxResult> BoundingBoxAsync(LocatorBoundingBoxOptions options = null)
        {
            return Component.BoundingBoxAsync(options);
        }

        public Task CheckAsync(LocatorCheckOptions options = null)
        {
            return Component.CheckAsync(options);
        }

        public Task ClearAsync(LocatorClearOptions options = null)
        {
            return Component.ClearAsync(options);
        }

        public Task ClickAsync(LocatorClickOptions options = null)
        {
            return Component.ClickAsync(options);
        }

        public Task<int> CountAsync()
        {
            return Component.CountAsync();
        }

        public Task DblClickAsync(LocatorDblClickOptions options = null)
        {
            return Component.DblClickAsync(options);
        }

        public Task DispatchEventAsync(string type, object eventInit = null, LocatorDispatchEventOptions options = null)
        {
            return Component.DispatchEventAsync(type, eventInit, options);
        }

        public Task DragToAsync(ILocator target, LocatorDragToOptions options = null)
        {
            return Component.DragToAsync(target, options);
        }

        public Task<IElementHandle> ElementHandleAsync(LocatorElementHandleOptions options = null)
        {
            return Component.ElementHandleAsync(options);
        }

        public Task<IReadOnlyList<IElementHandle>> ElementHandlesAsync()
        {
            return Component.ElementHandlesAsync();
        }

        public Task<T> EvaluateAsync<T>(string expression, object arg = null, LocatorEvaluateOptions options = null)
        {
            return Component.EvaluateAsync<T>(expression, arg, options);
        }

        public Task<T> EvaluateAllAsync<T>(string expression, object arg = null)
        {
            return Component.EvaluateAllAsync<T>(expression, arg);
        }

        public Task<IJSHandle> EvaluateHandleAsync(string expression, object arg = null,
            LocatorEvaluateHandleOptions options = null)
        {
            return Component.EvaluateHandleAsync(expression, arg, options);
        }

        public Task FillAsync(string value, LocatorFillOptions options = null)
        {
            return Component.FillAsync(value, options);
        }

        public ILocator Filter(LocatorFilterOptions options = null)
        {
            return Component.Filter(options);
        }

        public Task FocusAsync(LocatorFocusOptions options = null)
        {
            return Component.FocusAsync(options);
        }

        public IFrameLocator FrameLocator(string selector)
        {
            return Component.FrameLocator(selector);
        }

        public Task<string> GetAttributeAsync(string name, LocatorGetAttributeOptions options = null)
        {
            return Component.GetAttributeAsync(name, options);
        }

        public ILocator GetByAltText(string text, LocatorGetByAltTextOptions options = null)
        {
            return Component.GetByAltText(text, options);
        }

        public ILocator GetByAltText(Regex text, LocatorGetByAltTextOptions options = null)
        {
            return Component.GetByAltText(text, options);
        }

        public ILocator GetByLabel(string text, LocatorGetByLabelOptions options = null)
        {
            return Component.GetByLabel(text, options);
        }

        public ILocator GetByLabel(Regex text, LocatorGetByLabelOptions options = null)
        {
            return Component.GetByLabel(text, options);
        }

        public ILocator GetByPlaceholder(string text, LocatorGetByPlaceholderOptions options = null)
        {
            return Component.GetByPlaceholder(text, options);
        }

        public ILocator GetByPlaceholder(Regex text, LocatorGetByPlaceholderOptions options = null)
        {
            return Component.GetByPlaceholder(text, options);
        }

        public ILocator GetByRole(AriaRole role, LocatorGetByRoleOptions options = null)
        {
            return Component.GetByRole(role, options);
        }

        public ILocator GetByTestId(string testId)
        {
            return Component.GetByTestId(testId);
        }

        public ILocator GetByTestId(Regex testId)
        {
            return Component.GetByTestId(testId);
        }

        public ILocator GetByText(string text, LocatorGetByTextOptions options = null)
        {
            return Component.GetByText(text, options);
        }

        public ILocator GetByText(Regex text, LocatorGetByTextOptions options = null)
        {
            return Component.GetByText(text, options);
        }

        public ILocator GetByTitle(string text, LocatorGetByTitleOptions options = null)
        {
            return Component.GetByTitle(text, options);
        }

        public ILocator GetByTitle(Regex text, LocatorGetByTitleOptions options = null)
        {
            return Component.GetByTitle(text, options);
        }

        public Task HighlightAsync()
        {
            return Component.HighlightAsync();
        }

        public Task HoverAsync(LocatorHoverOptions options = null)
        {
            return Component.HoverAsync(options);
        }

        public Task<string> InnerHTMLAsync(LocatorInnerHTMLOptions options = null)
        {
            return Component.InnerHTMLAsync(options);
        }

        public Task<string> InnerTextAsync(LocatorInnerTextOptions options = null)
        {
            return Component.InnerTextAsync(options);
        }

        public Task<string> InputValueAsync(LocatorInputValueOptions options = null)
        {
            return Component.InputValueAsync(options);
        }

        public Task<bool> IsCheckedAsync(LocatorIsCheckedOptions options = null)
        {
            return Component.IsCheckedAsync(options);
        }

        public Task<bool> IsDisabledAsync(LocatorIsDisabledOptions options = null)
        {
            return Component.IsDisabledAsync(options);
        }

        public Task<bool> IsEditableAsync(LocatorIsEditableOptions options = null)
        {
            return Component.IsEditableAsync(options);
        }

        public Task<bool> IsEnabledAsync(LocatorIsEnabledOptions options = null)
        {
            return Component.IsEnabledAsync(options);
        }

        public Task<bool> IsHiddenAsync(LocatorIsHiddenOptions options = null)
        {
            Component.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Hidden}).GetAwaiter().GetResult();
            return Component.IsHiddenAsync(options);
        }

        public Task<bool> IsVisibleAsync(LocatorIsVisibleOptions options = null)
        {
            Component.WaitForAsync(new LocatorWaitForOptions{State = WaitForSelectorState.Visible}).GetAwaiter().GetResult();
            return Component.IsVisibleAsync(options);
        }

        public ILocator Locator(string selector, LocatorLocatorOptions options = null)
        {
            return Component.Locator(selector, options);
        }

        public ILocator Nth(int index)
        {
            return Component.Nth(index);
        }

        public Task PressAsync(string key, LocatorPressOptions options = null)
        {
            return Component.PressAsync(key, options);
        }

        public Task<byte[]> ScreenshotAsync(LocatorScreenshotOptions options = null)
        {
            return Component.ScreenshotAsync(options);
        }

        public Task ScrollIntoViewIfNeededAsync(LocatorScrollIntoViewIfNeededOptions options = null)
        {
            return Component.ScrollIntoViewIfNeededAsync(options);
        }

        public Task<IReadOnlyList<string>> SelectOptionAsync(string values, LocatorSelectOptionOptions options = null)
        {
            return Component.SelectOptionAsync(values, options);
        }

        public Task<IReadOnlyList<string>> SelectOptionAsync(IElementHandle values,
            LocatorSelectOptionOptions options = null)
        {
            return Component.SelectOptionAsync(values, options);
        }

        public Task<IReadOnlyList<string>> SelectOptionAsync(IEnumerable<string> values,
            LocatorSelectOptionOptions options = null)
        {
            return Component.SelectOptionAsync(values, options);
        }

        public Task<IReadOnlyList<string>> SelectOptionAsync(SelectOptionValue values,
            LocatorSelectOptionOptions options = null)
        {
            return Component.SelectOptionAsync(values, options);
        }

        public Task<IReadOnlyList<string>> SelectOptionAsync(IEnumerable<IElementHandle> values,
            LocatorSelectOptionOptions options = null)
        {
            return Component.SelectOptionAsync(values, options);
        }

        public Task<IReadOnlyList<string>> SelectOptionAsync(IEnumerable<SelectOptionValue> values,
            LocatorSelectOptionOptions options = null)
        {
            return Component.SelectOptionAsync(values, options);
        }

        public Task SelectTextAsync(LocatorSelectTextOptions options = null)
        {
            return Component.SelectTextAsync(options);
        }

        public Task SetCheckedAsync(bool checkedState, LocatorSetCheckedOptions options = null)
        {
            return Component.SetCheckedAsync(checkedState, options);
        }

        public Task SetInputFilesAsync(string files, LocatorSetInputFilesOptions options = null)
        {
            return Component.SetInputFilesAsync(files, options);
        }

        public Task SetInputFilesAsync(IEnumerable<string> files, LocatorSetInputFilesOptions options = null)
        {
            return Component.SetInputFilesAsync(files, options);
        }

        public Task SetInputFilesAsync(FilePayload files, LocatorSetInputFilesOptions options = null)
        {
            return Component.SetInputFilesAsync(files, options);
        }

        public Task SetInputFilesAsync(IEnumerable<FilePayload> files, LocatorSetInputFilesOptions options = null)
        {
            return Component.SetInputFilesAsync(files, options);
        }

        public Task TapAsync(LocatorTapOptions options = null)
        {
            return Component.TapAsync(options);
        }

        public Task<string> TextContentAsync(LocatorTextContentOptions options = null)
        {
            return Component.TextContentAsync(options);
        }

        public Task TypeAsync(string text, LocatorTypeOptions options = null)
        {
            return Component.TypeAsync(text, options);
        }

        public Task UncheckAsync(LocatorUncheckOptions options = null)
        {
            return Component.UncheckAsync(options);
        }

        public Task WaitForAsync(LocatorWaitForOptions options = null)
        {
            return Component.WaitForAsync(options);
        }

        public Task<JsonElement?> EvaluateAsync(string expression, object arg = null,
            LocatorEvaluateOptions options = null)
        {
            return Component.EvaluateAsync(expression, arg, options);
        }

        #endregion
    }
}