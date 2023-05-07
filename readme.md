# Hayot Management

## Development

1. Run Docker (or Docker Desktop)
1. Delete current build: `docker compose down`
1. Build & run, from root: `docker compose up -d --build`
1. Build, no cache: `docker compose build --no-cache`
1. Run containers, from root: `docker compose up -d`

### Debugging

```
docker build -t testimage ./ --no-cache
docker run -it --entrypoint /bin/bash testimage -s
```

### Reset local to last commit (excludes new files) 

`git checkout -- .`

### Clean out old docker files

`docker system prune`

## Database

Access terminal from `inventory-database` container

Connect to database:

1. `su - postgres` - switch to postgres user
1. `psql` - log into postgresql 
1. `\c products` - connect to products database

Options

- `\dt` - show tables
- `SELECT * FROM products ORDER BY id ASC` - query