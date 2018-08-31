git pull origin master
cd client
yarn
yarn build
cd ../
cp ./polyfill.js server/build/static/js
node inject_polyfill.js
cd server/
yarn start
