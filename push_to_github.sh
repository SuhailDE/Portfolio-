#!/usr/bin/env bash
# Helper script to push your portfolio to GitHub (https://github.com/SuhailDE)

set -e

REPO_URL="https://github.com/SuhailDE/mern-portfolio.git"

echo "=========================================================="
echo "  Suhail Hossain Portfolio — Push to GitHub"
echo "  Target: $REPO_URL"
echo "=========================================================="

# Check if git remote origin is configured
if ! git remote | grep -q 'origin'; then
  git remote add origin "$REPO_URL"
fi

echo ""
echo "Enter your GitHub Personal Access Token (or press enter to use SSH/default credentials):"
read -r -s GITHUB_TOKEN

if [ -n "$GITHUB_TOKEN" ]; then
  AUTHENTICATED_URL="https://${GITHUB_TOKEN}@github.com/SuhailDE/mern-portfolio.git"
  echo "Pushing main branch to GitHub using supplied token..."
  git push "$AUTHENTICATED_URL" main --force
  echo "✅ Successfully pushed to https://github.com/SuhailDE/mern-portfolio !"
else
  echo "Pushing using existing git credentials / SSH..."
  git push -u origin main
fi
