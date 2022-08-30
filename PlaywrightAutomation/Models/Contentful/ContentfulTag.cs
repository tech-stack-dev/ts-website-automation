using AutomationUtils.Extensions;
using System;
using System.ComponentModel;

namespace PlaywrightAutomation.Models.Contentful
{
    public class ContentfulTag
    {
        public string Id { get; set; }

        private TagPrefix _prefix;
        public TagPrefix Prefix
        {
            get => _prefix;
            set
            {
                _prefix = value;

                var random = Guid.NewGuid().ToString("N");
                Id = $"{_prefix.GetValue()}_{random}";
            }
        }

        public string Name { get; set; }
        public int Version { get; set; } = 1;

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
    }
}
