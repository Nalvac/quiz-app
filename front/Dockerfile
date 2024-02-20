# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

COPY ../GameInterface/. ../GameInterface/

RUN npm install

COPY . .

EXPOSE 5100

CMD [ "npm", "run", "dev" ]
