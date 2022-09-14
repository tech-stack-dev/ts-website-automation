using AutomationUtils.Extensions;
using System;
using System.ComponentModel;

namespace PlaywrightAutomation.Models.Contentful
{
    public class ContentfulTag
    {
        public string Id { get; private set; }
        public string Name { get; set; }

        private TagPrefix _prefix;
        public TagPrefix Prefix
        {
            get => _prefix;
            set
            {
                _prefix = value;

                var random = Guid.NewGuid().ToString("N");

                if (Name is not null)
                {
                    if (Name.ToLower().Contains("hot"))
                    {
                        // To add tag with background-color: rgb(255, 198, 0)
                        Id = "tag_hot";
                    }
                    else
                    {
                        Id = $"{_prefix.GetValue()}_{random}";
                    }
                }
            }
        }
        
        public int Version { get; set; } = 1;

        // TagPrefix is used to define the environment of the tag
        public enum TagPrefix
        {
            [Description("direction")]
            Direction,
            [Description("seniority")]
            Seniority,
            [Description("stack")]
            Stack,
            [Description("tag")]
            Tag
        }
    }
}
