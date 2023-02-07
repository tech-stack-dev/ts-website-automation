using ChoETL;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.RuntimeVariables;
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

        public void FillWithDefaultData(SessionRandomValue sessionRandom, int index = 1)
        {
            var randomValue = sessionRandom.RandomString;
           
            this.NameUs = this.NameUs.IsNullOrEmpty() ? $"Test{index}Career{randomValue}" : this.NameUs.AddRandom(sessionRandom);
            this.NameUa = this.NameUa.IsNullOrEmpty() ? $"NameUa_{index}_{randomValue}" : this.NameUa.AddRandom(sessionRandom);
            this.DescriptionUs = this.DescriptionUs.IsNullOrEmpty() ? $"DescriptionUs_{index}_{randomValue}" : this.DescriptionUs.AddRandom(sessionRandom);
            this.DescriptionUa = this.DescriptionUa.IsNullOrEmpty() ? $"DescriptionUa_{index}_{randomValue}" : this.DescriptionUa.AddRandom(sessionRandom);
            this.Type = "Link";
            this.LinkType = "Entry";
        }
    }
}