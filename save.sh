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
git diff --cached

# Prompt for commit message
read -p "Enter commit message: " commit_msg

# Commit and push
git commit -m "$commit_msg"
#git push
