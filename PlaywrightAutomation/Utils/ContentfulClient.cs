using Contentful.Core;
using Contentful.Core.Models;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.Providers;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Contentful.Core.Models.Management;
using static PlaywrightAutomation.Models.Contentful.ContentfulTag;

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

        public async void UnpublishCareerDescription(CareerDescription careerDescription)
        {
            await _client.UnpublishEntry(careerDescription.Id, careerDescription.Version);
        }

        public async void DeleteCareerDescription(CareerDescription careerDescription)
        {
            await _client.DeleteEntry(careerDescription.Id, careerDescription.Version);
        }

        #endregion

        #region Career

        public async Task<Career> CreateCareer(Career career, CareerDescription careerDescription, ContentfulTag tag)
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
            
            entry.Metadata = new ContentfulMetadata()
            {
                Tags = new List<Reference> { new Reference(SystemLinkTypes.Tag, tag.Id) }
            };

            var newEntry = await _client.CreateOrUpdateEntry(entry, contentTypeId: "career");

            await _client.PublishEntry(career.Id, career.Version);

            return career;
        }

        public async void UnpublishCareer(Career career)
        {
            await _client.UnpublishEntry(career.Id, career.Version);
        }

        public async void DeleteCareer(Career career)
        {
            await _client.DeleteEntry(career.Id, career.Version);
        }

        #endregion

        #region Tag

        public async Task<ContentfulTag> CreateTag(ContentfulTag tag, TagPrefix prefix)
        {
            var a = new ContentfulTag(prefix);
            await _client.CreateContentTag(tag.Name, tag.Id, true);
            return tag;
        }

        public async void DeleteTag(ContentfulTag tag)
        {
            await _client.DeleteContentTag(tag.Id, tag.Version);
        }

        #endregion
    }
}
