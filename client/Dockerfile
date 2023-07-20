FROM node:19

# Add due to Docker/React app bug
ENV CI=true

VOLUME /app/node_modules
WORKDIR /app

COPY ./package*.json ./
RUN npm install

