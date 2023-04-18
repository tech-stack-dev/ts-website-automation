#!/bin/bash
sudo apt-get update && sudo apt-get install jq
# Generate a datestamp
datestamp=$(date +%Y-%m-%d-%H-%M-%S)

# Find all the *.test.ts files in the folder (and its subfolders)
files=$(find . -name "*.test.ts")

# Loop through the files and extract the Jira test tags
jira_tags=()
for file in $files; do
  echo "Processing file: $file"
  while read -r line; do
    if [[ $line =~ @TSWEB-[0-9]{1,8} ]]; then
      tag="${BASH_REMATCH[0]}"
      jira_tags+=("$tag")
    fi
  done < "$file"
done

# Make requests to the Jira API for each tag
echo "Checking Jira status for the following tags:"
printf '%s\n' "${jira_tags[@]}"
echo

ready_tags=()
for tag in "${jira_tags[@]}"; do
    url="https://ts-website.atlassian.net/rest/api/3/issue/${tag}"
  echo "Making request to $url"
  status=$(curl "${url}" --silent --show-error -H "Authorization: Basic cWFfdGVjaHN0YWNrQHRlY2gtc3RhY2suaW86QVRBVFQzeEZmR0YwRTVvb01vd1RXVW1DVFYxNF93 bFR4ZmtwYTdleWV0VmNrel82aXNOczJvMk9aLV8tUFNYN2kxekVUb3dFVUdUUTdyT1dQOHNZdjNz Q3JNVV8zODlEMDhZS1QyWWxheVRNOU4wMnJQbDVyTThYZllHYXBhTF84UVdYckMxZ0stbTlsZFNP RzhIaGNpSXhDY0dmc1RCbjBLU2dqU1kyUVB6WkE0UXBkSDRPUVVZPUY4Q0Q5RUND" | jq -r )
  echo "Status for $tag: $status"
  if [[ "$status" == "Ready for QA" || "$status" == "Testing on Stage" || "$status" == "UI testing" || "$status" == "Done" || "$status" == "Closed" ]]; then
    ready_tags+=("$tag")
  fi
done

# Print the list of tags with a valid status
echo "Tags with a valid status:"
printf '%s\n' "${ready_tags[@]}"

# Save the tags to a file with a unique filename
filename="jira_tags_${datestamp}.txt"
echo "Saving tags to $filename"
printf '%s\n' "${ready_tags[@]}" > "$filename"
