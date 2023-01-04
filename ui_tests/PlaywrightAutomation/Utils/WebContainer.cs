using PlaywrightAutomation.Pages;
using System;
using System.Linq;
using System.Reflection;

namespace PlaywrightAutomation.Utils
{
    public static class WebContainer
    {
        public static string GetLocator(string className)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var type = assembly.GetTypes().FirstOrDefault(x => x.Name == className);
            var pageOrComponent = Activator.CreateInstance(type) as IWebContainer;
            return pageOrComponent.Container;
        }
    }
}
