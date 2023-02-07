using ChoETL;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.RuntimeVariables;
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

        public void FillWithDefaultData(SessionRandomValue sessionRandom, int index = 1)
        {
            var randomValue = sessionRandom.RandomString;
           
            this.AboutTheProjectUs = this.AboutTheProjectUs.IsNullOrEmpty() ? $"AboutTheProjectUs_{index}_{randomValue}" : this.AboutTheProjectUs.AddRandom(sessionRandom);
            this.AboutTheProjectUa = this.AboutTheProjectUa.IsNullOrEmpty() ? $"AboutTheProjectUa_{index}_{randomValue}": this.AboutTheProjectUa.AddRandom(sessionRandom);
            this.AboutTheRoleUs = this.AboutTheRoleUs.IsNullOrEmpty() ? $"AboutTheRoleUs_{index}_{randomValue}" : this.AboutTheRoleUs.AddRandom(sessionRandom);
            this.AboutTheRoleUa = this.AboutTheRoleUa.IsNullOrEmpty() ? $"AboutTheRoleUa_{index}_{randomValue}" : this.AboutTheRoleUa.AddRandom(sessionRandom);
            this.TitleUs = this.TitleUs.IsNullOrEmpty() ? $"Test{index}CareerDescription{randomValue}" : this.TitleUs.AddRandom(sessionRandom);
            this.TitleUa = this.TitleUa.IsNullOrEmpty() ? $"TitleUa_{index}_{randomValue}" : this.TitleUa.AddRandom(sessionRandom);
            this.YouWillUs = this.YouWillUs.IsNullOrEmpty() ? $"YouWillUs_{index}_{randomValue}" : this.YouWillUs.AddRandom(sessionRandom);
            this.YouWillUa = this.YouWillUa.IsNullOrEmpty() ? $"YouWillUa_{index}_{randomValue}" : this.YouWillUa.AddRandom(sessionRandom);
            this.YouAreUs = this.YouAreUs.IsNullOrEmpty() ? $"YouAreUs_{index}_{randomValue}" : this.YouAreUs.AddRandom(sessionRandom);
            this.YouAreUa = this.YouAreUa.IsNullOrEmpty() ? $"YouAreUa_{index}_{randomValue}" : this.YouAreUa.AddRandom(sessionRandom);
            this.WeWillUs = this.WeWillUs.IsNullOrEmpty() ? $"WeWillUs_{index}_{randomValue}" : this.WeWillUs.AddRandom(sessionRandom);
            this.WeWillUa = this.WeWillUa.IsNullOrEmpty() ? $"WeWillUa_{index}_{randomValue}" : this.WeWillUa.AddRandom(sessionRandom);
            this.WeAreUs = this.WeAreUs.IsNullOrEmpty() ? $"WeAreUs_{index}_{randomValue}" : this.WeAreUs.AddRandom(sessionRandom);
            this.WeAreUa = this.WeAreUa.IsNullOrEmpty() ? $"WeAreUa_{index}_{randomValue}" : this.WeAreUa.AddRandom(sessionRandom);
            this.SlugUs = this.SlugUs.IsNullOrEmpty() ? $"SlugUs_{index}_{randomValue}-v1" : this.SlugUs.AddRandom(sessionRandom);
        }
    }
}