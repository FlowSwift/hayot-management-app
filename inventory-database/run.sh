docker run -dp 5432:5432 --name products-db --network-alias products-db --mount type=volume,src=products-db,target=/var/lib/postgresql/data products-db