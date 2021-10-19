# build in local and replace the new build files to the cloud server
# yarn
npm run build
cp $(pwd)/build/200.html $(pwd)/build/index.html
scp  -i /Users/andreasbackup2/Desktop/FOLDER/job/andreas-server/id_rsa -r $(pwd)/build   root@165.22.0.89:/var/www/live/devThinker-frontend