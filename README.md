# InstaSurvey
Instant Survey Application

# Docker InstantSurvey Image
docker build -t wolverine .

# Running node server and client server
docker run -i -t -d -p 4200:4200 --name devenv --hostname wolverine wolverine 

docker exec -i -t -d devenv sh -c "cd /home/InstantSurvey/server && node_modules/.bin/babel-node app.ts"

docker exec -i -t -d devenv sh -c "cd /home/InstantSurvey/client && ng serve --host wolverine --port 4200"
