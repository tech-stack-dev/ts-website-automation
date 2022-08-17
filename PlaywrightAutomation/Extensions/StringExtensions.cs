using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using ChoETL;

namespace PlaywrightAutomation.Extensions
{
    public static class StringExtensions
    {
        public static string ToAutomationValue(this string str)
        {
            return str?.ToPascalCase().Replace(" ", string.Empty);
        }

        public static string RemoveSpaceAndSlash(this string str)
        {
            return str.Replace(" ", string.Empty).Replace("/", string.Empty);
        }

        public static List<string> ListTagsWithoutNumber(this List<string> strList)
        {
            var tagsList = strList.Select(x => Regex.Matches(x, @"^[a-zA-Z\s/]+\b"));
            return tagsList.SelectMany(x => x).Select(x => x.Value).ToList();
        }
    }
}
