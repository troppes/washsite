FROM node:lts-alpine


WORKDIR /app
COPY . .

RUN npm ci --only=production
RUN npm run setup

EXPOSE 3000

CMD [ "node", "server.js" ]