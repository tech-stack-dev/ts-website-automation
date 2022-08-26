using AutomationUtils.Extensions;
using System;
using System.ComponentModel;

namespace PlaywrightAutomation.Models.Contentful
{
    public class ContentfulTag
    {
        public string Id { get; set; }
        public TagPrefix Prefix { get; set; }

        public string Name { get; set; }
        public int Version { get; set; }

        // TODO Add description why we need Prefix 
        public enum TagPrefix
        {
            [Description("direction")]
            Direction,
            [Description("seniority")]
            Seniority,
            [Description("stack")]
            Stack
        }

        public ContentfulTag()
        {
            var random = Guid.NewGuid().ToString("N");
            Id = $"{Prefix.GetValue()}_{random}";
            Version = 1;
        }
    }
}
