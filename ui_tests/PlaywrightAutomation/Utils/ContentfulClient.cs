using Contentful.Core;
using Contentful.Core.Models;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.Providers;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Contentful.Core.Models.Management;

namespace PlaywrightAutomation.Utils
{
    public class ContentfulClient
    {
        private readonly HttpClient _httpClient;
        private readonly ContentfulManagementClient _client;

        public ContentfulClient()
        {
            _httpClient = new HttpClient();
            _client =
                new ContentfulManagementClient(_httpClient, ContentfulProvider.ManagmentApiKey, ContentfulProvider.SpaceId);
        }

        #region Career description

        public async Task<CareerDescription> CreateCareerDescription(CareerDescription careerDescription)
        {
            var entry = new Entry<dynamic>();
            entry.SystemProperties = new SystemProperties();
            entry.SystemProperties.Id = careerDescription.Id;

            entry.Fields = new
            {
                aboutTheProject = new Dictionary<string, string>()
                {
                    { "en-US", careerDescription.AboutTheProjectUs },
                    { "uk-UA", careerDescription.AboutTheProjectUa }
                },
                aboutTheRole = new Dictionary<string, string>()
                {
                    { "en-US", careerDescription.AboutTheRoleUs },
                    { "uk-UA", careerDescription.AboutTheRoleUa }
                },
                title = new Dictionary<string, string>()
                {
                    { "en-US", careerDescription.TitleUs },
                    { "uk-UA", careerDescription.TitleUa }
                },
                youWill = new Dictionary<string, dynamic>()
                {
                    { "en-US", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.WeAreUs,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" } },
                    { "uk-UA", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.YouWillUa,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" } }
                },
                youAre = new Dictionary<string, dynamic>()
                {
                    { "en-US", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.WeAreUs,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" } },
                    { "uk-UA", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.YouAreUa,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" } }
                },
                weWill = new Dictionary<string, dynamic>()
                {
                    { "en-US", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.WeAreUs,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" } },
                    { "uk-UA", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.WeWillUa,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" } }
                },
                weAre = new Dictionary<string, dynamic>()
                {
                    { "en-US", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.WeAreUa,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" } },
                    { "uk-UA", new {
                          data = new Data(),
                          content = new List<object>()
                          {
                              new {
                                  data = new Data(),
                                  content = new List<object>()
                                  {
                                       new {
                                          data = new Data(),
                                          marks =  new List<object>(){ },
                                          value= careerDescription.WeAreUa,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document" }
                    }
                },
                technologyStack = new Dictionary<string, string>()
                {
                    { "en-US", careerDescription.TechnologyStackUs }
                },
                slug = new Dictionary<string, string>()
                {
                    { "en-US", careerDescription.SlugUs }
                },
            };

            var newEntry = await _client.CreateOrUpdateEntry(entry, contentTypeId: "careerDescription");

            await _client.PublishEntry(careerDescription.Id, careerDescription.Version);

            return careerDescription;
        }

        public async Task UnpublishCareerDescription(CareerDescription careerDescription)
        {
            await _client.UnpublishEntry(careerDescription.Id, careerDescription.Version);
        }

        public async Task DeleteCareerDescription(CareerDescription careerDescription)
        {
            await _client.DeleteEntry(careerDescription.Id, careerDescription.Version);
        }

        #endregion

        #region Career

        public async Task<Career> CreateCareer(Career career, CareerDescription careerDescription, List<ContentfulTag> tags)
        {
            var entry = new Entry<dynamic>();
            entry.SystemProperties = new SystemProperties();
            entry.SystemProperties.Id = career.Id;

            entry.Fields = new
            {
                name = new Dictionary<string, string>()
                {
                    { "en-US", career.NameUs },
                    { "uk-UA", career.NameUa }
                },
                careerDescription = new Dictionary<string, dynamic>()
                {
                    { "en-US",
                        new {
                            sys = new {
                                type = career.Type,
                                linkType = career.LinkType,
                                id = careerDescription.Id
                            }
                        }
                    }
                },
                description = new Dictionary<string, string>()
                {
                    { "en-US", career.DescriptionUs },
                    { "uk-UA", career.DescriptionUa }
                }
            };

            var metadata = new List<Reference>();
            foreach (var tag in tags)
            {
                metadata.Add(new Reference(SystemLinkTypes.Tag, tag.Id));
            }

            entry.Metadata = new ContentfulMetadata()
            {
                Tags = metadata
            };

            var newEntry = await _client.CreateOrUpdateEntry(entry, contentTypeId: "career");

            await _client.PublishEntry(career.Id, career.Version);

            return career;
        }

        public async Task UnpublishCareer(Career career)
        {
            await _client.UnpublishEntry(career.Id, career.Version);
        }

        public async Task DeleteCareer(Career career)
        {
            await _client.DeleteEntry(career.Id, career.Version);
        }

        #endregion

        #region Tag

        public async Task<ContentfulTag> CreateTag(ContentfulTag tag)
        {
            if (!tag.Id.Equals("tag_hot"))
            {
                await _client.CreateContentTag(tag.Name, tag.Id, true);
            }

            return tag;
        }

        public async Task DeleteTag(ContentfulTag tag)
        {
            await _client.DeleteContentTag(tag.Id, tag.Version);
        }

        #endregion
    }
}
