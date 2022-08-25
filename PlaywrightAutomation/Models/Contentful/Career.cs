using System;

namespace PlaywrightAutomation.Models.Contentful
{
    public class Career
    {
        public string Id { get; init; }
        public int Version { get; set; }
        public string NameUs { get; set; }
        public string NameUa { get; set; }
        public string DescriptionUs { get; set; }
        public string DescriptionUa { get; set; }
        public string Type { get; set; }
        public string LinkType { get; set; }

        public Career()
        {
            Id = Guid.NewGuid().ToString("N");
            Version = 1;
        }
    }
}
