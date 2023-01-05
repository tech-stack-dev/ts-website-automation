using ChoETL;
using System;

namespace PlaywrightAutomation.Models.Contentful
{
    public class CareerDescription
    {
        public string Id { get; init; }
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
           
            this.AboutTheProjectUs = this.AboutTheProjectUs.IsNullOrEmpty() ? $"AboutTheProjectUs{randomValue}" : this.AboutTheProjectUs;
            this.AboutTheProjectUa = this.AboutTheProjectUa.IsNullOrEmpty() ? $"AboutTheProjectUa{randomValue}": this.AboutTheProjectUa;
            this.AboutTheRoleUs = this.AboutTheRoleUs.IsNullOrEmpty() ? $"AboutTheRoleUs{randomValue}" : this.AboutTheRoleUs;
            this.AboutTheRoleUa = this.AboutTheRoleUa.IsNullOrEmpty() ? $"AboutTheRoleUa{randomValue}" : this.AboutTheRoleUa;
            this.TitleUs = this.TitleUs.IsNullOrEmpty() ? $"TitleUs{randomValue}" : this.TitleUs;
            this.TitleUa = this.TitleUa.IsNullOrEmpty() ? $"TitleUa{randomValue}" : this.TitleUa;
            this.YouWillUs = this.YouWillUs.IsNullOrEmpty() ? $"YouWillUs{randomValue}" : this.YouWillUs;
            this.YouWillUa = this.YouWillUa.IsNullOrEmpty() ? $"YouWillUa{randomValue}" : this.YouWillUa;
            this.YouAreUs = this.YouAreUs.IsNullOrEmpty() ? $"YouAreUs{randomValue}" : this.YouAreUs;
            this.YouAreUa = this.YouAreUa.IsNullOrEmpty() ? $"YouAreUa{randomValue}" : this.YouAreUa;
            this.WeWillUs = this.WeWillUs.IsNullOrEmpty() ? $"WeWillUs{randomValue}" : this.WeWillUs;
            this.WeWillUa = this.WeWillUa.IsNullOrEmpty() ? $"WeWillUa{randomValue}" : this.WeWillUa;
            this.WeAreUs = this.WeAreUs.IsNullOrEmpty() ? $"WeAreUs{randomValue}" : this.WeAreUs;
            this.WeAreUa = this.WeAreUa.IsNullOrEmpty() ? $"WeAreUa{randomValue}" : this.WeAreUa;
            this.SlugUs = this.SlugUs.IsNullOrEmpty() ? $"SlugUs{randomValue}-v1" : this.SlugUs;

            return this;
        }
    }
}
