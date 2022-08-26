using AutomationUtils.Extensions;
using System;
using System.ComponentModel;

namespace PlaywrightAutomation.Models.Contentful
{
    public class ContentfulTag
    {
        public string Name { get; set;}
        public int Version { get; set;}
        public string Id { get; set;}

        // TagPrefix 
        public enum TagPrefix
        {
            [Description("direction")]
            Direction,
            [Description("seniority")]
            Seniority,
            [Description("stack")]
            Stack
        }

        public ContentfulTag(TagPrefix prefix)
        {
            var random = Guid.NewGuid().ToString("N");
            Id = $"{prefix.GetValue()}_{random}";
            Version = 1;
        }
    }
}
