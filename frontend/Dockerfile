FROM node:14.7.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm build

RUN npm install

COPY . .

ENV PORT=9000

EXPOSE 9000

CMD ["npm", "start"]
