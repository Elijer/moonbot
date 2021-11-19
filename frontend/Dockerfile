# alpine is a lighter weight node image
# Karan says it could cause problems with "native libraries"
FROM node:14-alpine AS development
# Not sure what this environmental variable is for.
ENV NODE_ENV development
# ENV COMPOSE_PROJECT_NAME dev7
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start" ]

FROM node:14-alpine AS builder
ENV NODE_ENV production
# ENV COMPOSE_PROJECT_NAME prod7
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install -g sass
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine AS production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]