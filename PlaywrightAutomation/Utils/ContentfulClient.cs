using Contentful.Core;
using Contentful.Core.Models;
using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.Providers;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

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

        public async Task<string> CreateCareerDescription(CareerDescription careerDescription)
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
                    { "en-US", careerDescription.AboutTheProjectUs },
                    { "uk-UA", careerDescription.AboutTheProjectUa }
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
                slug = new Dictionary<string, string>()
                {
                    { "en-US", careerDescription.SlugUs }
                },
            };

            var newEntry = await _client.CreateOrUpdateEntry(entry, contentTypeId: "careerDescription");

            await _client.PublishEntry(careerDescription.Id, 1);

            return careerDescription.Id;
        }
    }
}
