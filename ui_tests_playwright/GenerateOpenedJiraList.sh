#!/bin/bash
sudo apt-get update && sudo apt-get install jq

JiraAuthToken=$1
envBuildId=$2
allowed_statuses=("Ready for QA" "Testing on Stage" "UI testing" "Done" "Closed")

# Dive through the test files and extract the Jira test tags
files=$(find . -name "*.test.ts")
jira_tags=()
for file in $files; do
  echo "Processing file: $file"
  while read -r line; do
      tags=$(echo "$line" | grep -o 'TSWEB-[0-9]\{1,8\}')
      for tag in $tags; do
      jira_tags+=("$tag")
    done
  done < "$file"
done

# Remove duplicates from the list
jira_tags=($(echo "${jira_tags[@]}" | tr ' ' '\n' | sort -u))

# Make requests to the Jira API for each tag
echo "Checking Jira status for the following tags:"
printf '%s\n' "${jira_tags[@]}"
echo
tags_to_skip=()
for tag in "${jira_tags[@]}"; do
    url="https://ts-website.atlassian.net/rest/api/3/issue/${tag}ggg"
    echo "Making request to $url"
    status=$(curl "$url" --silent --show-error -H "Authorization: $JiraAuthToken" | jq -r '.fields.status.name')
    # Check that 
    if [[ -z $status ]]; then
        echo "Error: Status is null for tag $tag"
        exit 1
    fi
    echo "Status for $tag: $status"
    if [[ ! "${allowed_statuses[@]}" =~ "$status" ]]; then
        tags_to_skip+=("@$tag")
        echo "THE TAG ADDED: $tag"
    fi
done

echo "Opened jiras:"
printf '%s\n' "${tags_to_skip[@]}"

# Save the tags to a file with a unique filename
filename="jira_tags_${envBuildId}.txt"
echo "Saving tags to $filename"

if [ ${#tags_to_skip[@]} -eq 1 ]; then
  echo "One Tag to Skip"
  printf "${tags_to_skip[@]}" > "$filename"

elif [ ${#tags_to_skip[@]} -gt 1 ]; then
  echo "Following tags will be skipped"
  printf '%s^|' "${tags_to_skip[@]:0:${#tags_to_skip[@]}-1}" > "$filename"
  printf '%s' "${tags_to_skip[${#tags_to_skip[@]}-1]}" >> "$filename"
else
  echo "No tags to skip"
  printf '%s' "@NO_TESTS_TO_SKIP" > "$filename"
fi
# Print file content
cat $filename