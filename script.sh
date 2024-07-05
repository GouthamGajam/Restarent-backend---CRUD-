mkdir config controllers models utils 
touch .gitignore
echo "node_modules" > .gitignore
echo "config" >> .gitignore
cd config
touch default.json
cd ..
cd utils
touch dbconnect.js
cd ..
npm init -y
touch app.js
npm install express config axios mongoose nodemon
 
