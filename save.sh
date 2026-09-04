#!/bin/bash

# Stage all changes
git add .

# Check if there are changes
if git diff --cached --quiet; then
  echo "No staged changes."
  exit 0
fi

# Display diff for user reference
echo "Current changes:"
# git diff --cached
git status

# Prompt for commit message
read -p "Enter commit message: " commit_msg

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

# Commit and push
git commit -m "$commit_msg" -m "$body"
# git push
