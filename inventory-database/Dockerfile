FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB products
COPY products.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
