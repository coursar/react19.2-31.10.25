git clean -xfd -e node_modules
git pull origin main -X theirs --allow-unrelated-histories
git reset --hard origin/main
