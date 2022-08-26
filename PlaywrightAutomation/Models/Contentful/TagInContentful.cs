using System;

namespace PlaywrightAutomation.Models.Contentful
{
    public class TagInContentful
    {
        public string Name { get; set;}
        public int Version { get; set;}
        public string Id { get; set;}

        public TagInContentful()
        {
            Id = Guid.NewGuid().ToString("N");
            Version = 1;
        }
    }
}
