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

## Production

### Set up cron tab

For auto backups, add <0 1 * * * /inventory-database/auto_backup.sh> using `crontab -e`

### Set up env vars

- env vars for db connection in docker compose
- add env vars as defined below

## Environmental variables

Set up `.env` in inventory-manager:

- run `node inventory-manager/authKeyGen.js`
- copy key to .env in inventory-manager, replacing "key" with generated code

Set up `.env` in inventory-manager:

```sh
JWT_SECRET=key
```

Set up `.env` in client:

```sh
REACT_APP_BASE_URL=http://localhost:5000
```

Set up `.env` in root:

```sh
POSTGRES_PASSWORD=password
POSTGRES_DB=database
```

## Database

Access terminal from `inventory-database` container. 

Delete volume if need to reset database content: `docker volume rm hayot-management-app_products-db`

Connect to database:

1. `su - postgres` - switch to postgres user
1. `psql` - log into postgresql 
1. `\c products` - connect to products database

Options

- `\dt` - show tables
- `SELECT * FROM products ORDER BY id ASC` - query

## To do

- ✓ Categories by brand ID
- ✓ Pagination
- ✓ Update product quantity by ID
- Delete or archive products
- ✓ Show Log out if logged in

FED:
- ✓ Search
- ✓ Add product modal
- ✓ Add brand modal
- ✓ Add category modal
- ✓ Debug numeric inputs with decimals
- ✓ Dynamic brand / category selectboxes
- ✓ Quantity save
- ✓ Edits brands / categories
- ✓ Styling mobile menu
- ✓ Remove count input
- Pagination RTL
- Mobile table: Brand - category - name
