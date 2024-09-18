FROM node:alpine

WORKDIR /auth

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 2000

CMD [ "npm","run","dev" ]