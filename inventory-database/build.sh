#create docker network if it does not exists
docker network inspect hayot-management >/dev/null 2>&1 || \
    docker network create --driver bridge hayot-management
docker build -t products-db ./