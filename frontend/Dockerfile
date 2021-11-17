FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9000

EXPOSE 9000

CMD ["npm", "start"]