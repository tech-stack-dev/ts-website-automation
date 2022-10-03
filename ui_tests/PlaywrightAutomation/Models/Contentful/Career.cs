using System;

namespace PlaywrightAutomation.Models.Contentful
{
    public class Career
    {
        public string Id { get; set; }
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

        public Career FillWithDefaultData(string randomValue = null)
        {
            randomValue ??= Guid.NewGuid().ToString("N");

            this.Id ??= randomValue;
            this.Version = this.Version <= 0 ? 1 : this.Version;
            this.NameUs = $"NameUs{randomValue}";
            this.NameUa = $"NameUa{randomValue}";
            this.DescriptionUs = $"DescriptionUs{randomValue}";
            this.DescriptionUa = $"DescriptionUa{randomValue}";
            this.Type = "Link";
            this.LinkType = "Entry";

            return this;
        }
    }
}
