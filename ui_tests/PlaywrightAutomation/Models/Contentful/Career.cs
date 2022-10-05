using ChoETL;
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

        public Career FillWithDefaultData(string randomValue = null)
        {
            randomValue ??= Guid.NewGuid().ToString("N");
           
            this.NameUs = this.NameUs.IsNullOrEmpty() ? $"NameUs{randomValue}" : this.NameUs;
            this.NameUa = this.NameUa.IsNullOrEmpty() ? $"NameUa{randomValue}" : this.NameUa;
            this.DescriptionUs = this.DescriptionUs.IsNullOrEmpty() ? $"DescriptionUs{randomValue}" : this.DescriptionUs;
            this.DescriptionUa = this.DescriptionUa.IsNullOrEmpty() ? $"DescriptionUa{randomValue}" : this.DescriptionUa;
            this.Type = "Link";
            this.LinkType = "Entry";

            return this;
        }
    }
}
