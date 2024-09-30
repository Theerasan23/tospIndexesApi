FROM node:20.11.1-alpine

RUN mkdir -p /api
WORKDIR /

COPY package*.json ./api

COPY ./api .

RUN npm install

EXPOSE 4000

CMD [ "npm" , "start" ]