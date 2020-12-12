#!/bin/sh
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]; then
  echo 'Aborting script, please use master branch';
  exit 1;
fi
heroku git:remote -a ballz3
git pull
cd frontend/
npm install
npm run build
cd ../backend
npm install
npm run build
cd ../../
git add .
git add -f Assignment3/backend/dist/
git commit -m "Heroku deploy"
git push heroku master
heroku ps:scale web=1
read -p "Press Key"