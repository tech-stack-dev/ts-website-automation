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

        public string SlugUs { get; set; }

        public CareerDescription()
        {
            Id = Guid.NewGuid().ToString("N");
            Version = 1;
        }
    }
}
