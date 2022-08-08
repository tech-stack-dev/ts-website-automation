using System;
using Microsoft.Playwright;
using PlaywrightAutomation.Components.Base;

namespace PlaywrightAutomation.Components
{
    public abstract class BaseWebComponent
    {
        public IPage Page { get; set; }


        public virtual void CheckAutomationClass()
        {
        }

        public Properties Props = new Properties();

        protected ILocator Components;

        protected abstract string Construct();

        public void Build()
        {
            if (!(Props.ParentSelector is null) && !(Props.Parent is null))
            {
                throw new Exception("Not allowed to use Parent element selector and Parent element together");
            }

            ParentSelector = Props.ParentSelector;
            Parent = Props.Parent;

            #region Parent element

            if (!(Props.ParentSelector is null))
            {
                if (!Page.IsVisibleAsync(Props.ParentSelector).GetAwaiter().GetResult())
                {
                    return;
                }

                Parent = Page.Locator(ParentSelector);
            }

            #endregion

            var selector = Construct();
            Components = Parent is null ? Page.Locator(selector) : Parent.Locator(selector);

            try
            {
                CheckAutomationClass();
            }
            catch
            {
            }
        }

        public ILocator Instance => Components;

        public string Identifier { get; set; }

        private string ParentSelector { get; set; }

        private ILocator Parent { get; set; }
    }
}