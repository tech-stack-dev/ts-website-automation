using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BoDi;
using Contentful.Core;
using Contentful.Core.Models;
using Microsoft.Playwright;
using Newtonsoft.Json;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class BeforeAfterActions
    {
        private readonly BrowserFactory _browserFactory;
        private readonly IObjectContainer _objectContainer;

        public BeforeAfterActions(IObjectContainer objectContainer,
            BrowserFactory browserFactory)
        {
            _browserFactory = browserFactory;
            _objectContainer = objectContainer;
        }

        [BeforeScenario]
        public async Task OnStartUp()
        {
            var httpClient = new HttpClient();
            var client = new ContentfulManagementClient(httpClient, "CFPAT-6uzPJmOsnLeRqykPc4m0hrOeKs3DlEC1v53HbjOmLcE", "pr38pccqrbr6");

            var objId = Guid.NewGuid().ToString("N");

            var entry = new Entry<dynamic>();
            entry.SystemProperties = new SystemProperties();
            entry.SystemProperties.Id = objId;

            entry.Fields = new
            {
                aboutTheProject = new Dictionary<string, string>()
                {
                    { "en-US", "VDO_US" },
                    { "uk-UA", "VDO_UK"}
                },
                aboutTheRole = new Dictionary<string, string>()
                {
                    { "en-US", "VDO_UK" },
                    { "uk-UA", "VDO_UK"}
                },
                title = new Dictionary<string, string>()
                {
                    { "en-US", "VDO_UK" },
                    { "uk-UA", "VDO_UK"}
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
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
                                          value= "You are US",
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                          nodeType = "document"
                      }
                    },
                },
                slug = new Dictionary<string, string>()
                {
                    { "en-US", "Test_Slug2" }
                },
            };

            var newEntry = await client.CreateOrUpdateEntry(entry, contentTypeId: "careerDescription");

            await client.PublishEntry(objId, 1);

            _browserFactory.PlaywrightInstance = await Playwright.CreateAsync();
            _browserFactory.InitLocalBrowser();
        }

        [AfterScenario]
        public async Task AfterScenario(IObjectContainer container)
        {
            var browsers = _browserFactory.Browsers;
            if (browsers.Any())
            {
                foreach (IBrowser browser in browsers)
                {
                    await browser.CloseAsync();
                }
            }

            var playwright = _browserFactory.PlaywrightInstance;
            playwright.Dispose();
        }
    }

    public class Data
    {
    }

    public class Root
    {
        public Data data { get; set; }
        public List<object> marks { get; set; }
        public string value { get; set; }
        public string nodeType { get; set; }
    }

}
