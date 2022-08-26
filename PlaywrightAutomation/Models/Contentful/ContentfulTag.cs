using System;

namespace PlaywrightAutomation.Models.Contentful
{
    public class ContentfulTag
    {
        public string Name { get; set;}
        public int Version { get; set;}
        public string Id { get; set;}

        public ContentfulTag()
        {
            // Id = Guid.NewGuid().ToString("N");
            Id = "direction_testTag";
            Version = 1;
        }
    }
}
