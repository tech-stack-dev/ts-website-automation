using System;

namespace PlaywrightAutomation.Helpers
{
    public static class ColorsConvertor
    {
        public static string Converter(string colorName)
        {
            switch (colorName.ToLower())
            {
                case "orange yellow":
                    return "rgb(255, 198, 0)";
                default:
                    throw new Exception($"'{colorName}' color not found in convertor");
            }
        }
    }
}
