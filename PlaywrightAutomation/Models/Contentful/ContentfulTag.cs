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

        // TagPrefix is used to define the environment of the tag
        public enum TagPrefix
        {
            [Description("direction")]
            Direction,
            [Description("seniority")]
            Seniority,
            [Description("stack")]
            Stack
        }

        public ContentfulTag CreateIdForTag()
        {
            var random = Guid.NewGuid().ToString("N");
            Id = $"{Prefix.GetValue()}_{random}";
            Version = 1;
            return this;
        }
    }
}
