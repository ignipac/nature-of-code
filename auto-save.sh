#!/bin/bash

git add .

if git diff --cached --quiet; then
  echo "No staged changes."
  exit 0
fi

# Build the body from staged file changes
body=""
staged_changes=$(git diff --cached --name-status)

while IFS= read -r line; do
  status=$(echo "$line" | awk '{print $1}')
  file=$(echo "$line" | awk '{print $2}')
  case $status in
    A) body+="added: $file"$'\n' ;;
    M) body+="modified: $file"$'\n' ;;
    D) body+="deleted: $file"$'\n' ;;
  esac
done <<< "$staged_changes"

# Subject = timestamp only, body = details
git commit -m "auto commit $(date '+%b %d, %Y, %H:%M:%S')" -m "$body"
git push
