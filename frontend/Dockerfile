FROM node:lts-alpine as build
WORKDIR /app
COPY . .
COPY .env_dist .env
RUN npm ci
RUN npm run build


FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/release .
COPY --from=build /app/package*.json .

RUN npm ci

EXPOSE 8080
CMD [ "node", "index.js" ]