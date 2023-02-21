FROM node:19

# Add due to Docker/React app bug
ENV CI=true

WORKDIR /app

COPY ./package*.json ./
RUN npm install

