#!/bin/bash
sudo apt-get update && sudo apt-get install jq

#JiraAuthToken="Basic cWFfdGVjaHN0YWNrQHRlY2gtc3RhY2suaW86QVRBVFQzeEZmR0YwRTVvb01vd1RXVW1DVFYxNF93 bFR4ZmtwYTdleWV0VmNrel82aXNOczJvMk9aLV8tUFNYN2kxekVUb3dFVUdUUTdyT1dQOHNZdjNz Q3JNVV8zODlEMDhZS1QyWWxheVRNOU4wMnJQbDVyTThYZllHYXBhTF84UVdYckMxZ0stbTlsZFNP RzhIaGNpSXhDY0dmc1RCbjBLU2dqU1kyUVB6WkE0UXBkSDRPUVVZPUY4Q0Q5RUND"
JiraAuthToken=$1
allowed_statuses=("Ready for QA" "Testing on Stage" "UI testing" "Done" "Closed")

echo $JiraAuthToken
envBuildStep=$2

# Dive through the test files and extract the Jira test tags
files=$(find . -name "*.test.ts")
jira_tags=()
for file in $files; do
  echo "Processing file: $file"
  while read -r line; do
    if [[ $line =~ TSWEB-[0-9]{1,8} ]]; then
      tag="${BASH_REMATCH[0]}"

      jira_tags+=("$tag")
    fi
  done < "$file"
done
# Remove duplicates from the list
jira_tags=($(echo "${jira_tags[@]}" | tr ' ' '\n' | sort -u))

# Make requests to the Jira API for each tag
echo "Checking Jira status for the following tags:"
printf '%s\n' "${jira_tags[@]}"
echo

ready_tags=()
for tag in "${jira_tags[@]}"; do
    url="https://ts-website.atlassian.net/rest/api/3/issue/${tag}"
    echo "Making request to $url"
    status=$(curl "$url" --silent --show-error -H "Authorization: $JiraAuthToken" | jq -r '.fields.status.name')
    echo "Status for $tag: $status"
    if [[ ! "${allowed_statuses[@]}" =~ "$status" ]]; then
        ready_tags+=("@$tag")
        echo "THE TAG ADDED: $tag"
    fi
done

echo "Opened jiras:"
printf '%s\n' "${ready_tags[@]}"

# Save the tags to a file with a unique filename
filename="jira_tags_${envBuildStep}.txt"
echo "Saving tags to $filename"
printf '%s\n' "${ready_tags[@]}" > "$filename"
