FROM node:lts-alpine

# make the 'app' folder the current working directory
WORKDIR /app

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY release/ .

EXPOSE 8080

CMD [ "node", "index.js" ]