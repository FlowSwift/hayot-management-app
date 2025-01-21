#init DB on first startup
FROM postgres:15
COPY ./products.sql /docker-entrypoint-initdb.d/
