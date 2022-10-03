using System;

namespace PlaywrightAutomation.Models.Contentful
{
    public class CareerDescription
    {
        public string Id { get; set; }
        public int Version { get; set; }

        public string AboutTheProjectUs { get; set; }
        public string AboutTheProjectUa { get; set; }

        public string AboutTheRoleUs { get; set; }
        public string AboutTheRoleUa { get; set; }

        public string TitleUs { get; set; }
        public string TitleUa { get; set; }

        public string YouWillUs { get; set; }
        public string YouWillUa { get; set; }

        public string YouAreUs { get; set; }
        public string YouAreUa { get; set; }

        public string WeWillUs { get; set; }
        public string WeWillUa { get; set; }

        public string WeAreUs { get; set; }
        public string WeAreUa { get; set; }
        public string TechnologyStackUs { get; set; }
        public string SlugUs { get; set; }

        public CareerDescription()
        {
            Id = Guid.NewGuid().ToString("N");
            Version = 1;
        }

        public CareerDescription FillWithDefaultData(string randomValue = null)
        {
            randomValue ??= Guid.NewGuid().ToString("N");

            this.Id ??= randomValue;
            this.Version = this.Version <= 0 ? 1 : this.Version;
            this.AboutTheProjectUs ??= $"AboutTheProjectUs{randomValue}";
            this.AboutTheProjectUa ??= $"AboutTheProjectUa{randomValue}";
            this.AboutTheRoleUs ??= $"AboutTheRoleUs{randomValue}";
            this.AboutTheRoleUa ??= $"AboutTheRoleUa{randomValue}";
            this.TitleUs ??= $"TitleUs{randomValue}";
            this.TitleUa ??= $"TitleUa{randomValue}";
            this.YouWillUs ??= $"YouWillUs{randomValue}";
            this.YouWillUa ??= $"YouWillUa{randomValue}";
            this.YouAreUs ??= $"YouAreUs{randomValue}";
            this.YouAreUa ??= $"YouAreUa{randomValue}";
            this.WeWillUs ??= $"WeWillUs{randomValue}";
            this.WeWillUa ??= $"WeWillUa{randomValue}";
            this.WeAreUs ??= $"WeAreUs{randomValue}";
            this.WeAreUa ??= $"WeAreUa{randomValue}";
            this.SlugUs ??= $"SlugUs{randomValue}";

            return this;
        }
    }
}
