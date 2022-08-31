using System;

namespace PlaywrightAutomation.Helpers
{
    public static class ColorsConvertor
    {
        public static string Converter(string colorName)
        {
            return colorName.ToLower() switch
            {
                "orange yellow" => "rgb(255, 198, 0)",
                _ => throw new Exception($"'{colorName}' color not found in convertor")
            };
        }
    }
}
