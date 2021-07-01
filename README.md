# Build docker image

docker build -t IMAGE_NAME DIRECTORY_OF_DOCKERFILE

# Open docker container shell

docker exec -it CONTAINER_NAME /bin/bash

# Execute docker compose

docker-compose up

# Execute docker compose in bg

docker-compose up -d

# Execute docker compose forcing recreation

docker-compose up --force-recreate

# Start/Stop containers inside docker compose

docker-compose [start/stop]

# Show container logs

docker logs CONTAINER_NAME -f

# Show container IP

docker exec CONTAINER_NAME cat /etc/hosts

# TypeORM

## Run Migration
yarn typeorm migration:run

## Revert Migration
yarn typeorm migration:revert