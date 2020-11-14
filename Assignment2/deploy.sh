#!/bin/sh
cd Frontend/
npm install
npm run build
cd ../Backend
npm run build
cd ../
git add .
git add -f Backend/dist/
git commit -m "Heroku deploy"
git push heroku master
heroku ps:scale web=1