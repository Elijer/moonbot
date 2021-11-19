# alpine is a lighter weight node image
# Karan says it could cause problems with "native libraries"
FROM node:14-alpine AS development
# Not sure what this environmental variable is for.
ENV NODE_ENV development
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]