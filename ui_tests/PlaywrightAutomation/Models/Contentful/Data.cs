using System.Collections.Generic;

namespace PlaywrightAutomation.Models.Contentful
{
    public class Data
    {
        public static object Content(string value)
        {
            var obj = new
            {
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
                                          value= value,
                                          nodeType = "text"
                                       }
                                  },
                                  nodeType = "paragraph"
                              }
                          },
                nodeType = "document"
            };
            return obj;
        }
    }
}
