FROM node:19
ENV POSTGRES_HOST products-db
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB products
ENV POSTGRES_PORT 5432
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]
EXPOSE 5000