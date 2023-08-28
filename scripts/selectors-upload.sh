#!/bin/bash

folder_path="./ui_tests_playwright/automation/identifiers"
project_name="ts-website"
api_endpoint="https://prod-83.eastus.logic.azure.com:443/workflows/03c0c0c9a80a4873849bc3650683d67a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=G5S_3XufloYlxYBzsOE7K1sH1dCnybL0q7PCYjYAD38"

# Function to send JSON data to the API
send_data_to_api() {
  local data="$1"
  curl -X POST -H "Content-Type: application/json" -d "$data" "$api_endpoint"
}

# Array to store the JSON objects
elements=()
batch_size=50  # Adjust the batch size as needed

# Loop through each .ts file in the folder
while IFS= read -r -d '' file; do
    while IFS= read -r line; do
        # Extract the class and property names from the line
        if [[ $line =~ static\ ([a-zA-Z0-9_]+)\ =\ \'([^\']+)\' ]]; then
            file_name=$(basename -- "$file")
            class_name="${file_name%.*}"
            property_name="${BASH_REMATCH[1]}"
            locator_value="${BASH_REMATCH[2]}"

            # Create a JSON object for the extracted values
            json_object="{ \"Project\": \"$project_name\", \"Class\": \"$class_name\", \"Property\": \"$property_name\", \"Locator\": \"$locator_value\" }"

            # Add the JSON object to the array
            elements+=("$json_object")

            # Send the JSON data in batches
            if (( ${#elements[@]} >= batch_size )); then
                json_array=$(printf '%s\n' "${elements[@]}" | jq -s '.')
                send_data_to_api "$json_array"
                elements=()
            fi
        fi
    done < "$file"
done < <(find "$folder_path" -type f -name "*.ts" -print0)

# Send any remaining JSON data
if [[ ${#elements[@]} -gt 0 ]]; then
    json_array=$(printf '%s\n' "${elements[@]}" | jq -s '.')
    send_data_to_api "$json_array"
fi
