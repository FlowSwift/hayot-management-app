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

## Environmental variables

Set up .env in root:

- run `node inventory-manager/authKeyGen.js`
- copy key to .env in root, replacing "key" with generated code `JWT_SECRET='key'`

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
- Show Log out if logged in

FED:
- ✓ Search
- ✓ Add product modal
- ✓ Add brand modal
- ✓ Add category modal
- Debug numeric inputs with decimals
- ✓ Dynamic brand / category selectboxes
- ✓ Quantity save
- ✓ Edits brands / categories
- Styling mobile menu
- Remove count input
- Pagination RTL
- Mobile table: Brand - category - name