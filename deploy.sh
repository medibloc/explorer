git pull origin master
cd client
npm install
npm run build
cd ../
cp ./polyfill.js server/build/static/js
node inject_polyfill.js
cd server/
pm2 start npm -- start
