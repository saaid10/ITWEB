#!/bin/sh
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]; then
  echo 'Aborting script, please use master branch';
  exit 1;
fi
heroku git:remote -a ballzfitness
git pull
cd Frontend/
npm install
npm run build
cd ../Backend
npm install
npm run build
cd ../../
git add .
git add -f Assignment2/Backend/dist/
git commit -m "Heroku deploy"
git push heroku master
heroku ps:scale web=1
read -p "Press Key"