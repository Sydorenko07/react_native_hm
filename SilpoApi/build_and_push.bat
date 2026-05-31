@echo off

echo Docker login...
docker login

echo Building Docker image api...
docker build -t npd421-api . 

echo Tagging Docker image api...
docker tag npd421-api:latest novakvova/npd421-api:latest

echo Pushing Docker image api to repository...
docker push novakvova/npd421-api:latest

echo Done ---api---!
pause
 