## Setup

To configure the server, rename the .env_dist to .env and edit the variables.

To create the SQLite database, use the script `npm i` followed by `npm run setup`. With this the database will be created. To customize the database entries further you can look into the `setupDatabase.js`.

## Authentication

To authenticate yourself, please use the `/api/auth/login` route, it requieres basic auth Afterwards, a JWT token is created. All other routes are only accessible wit that token.

## Enviroment Variables

If variables are set by the docker container, they will be read first. Afterwards the variables from the .env file will be used. There are currently four variables to be set

```
API_ADMIN=admin
API_PASSWORD=admin
```
To set the primary admin.

```DEMO_DATA=FALSE```
Which creates demo data, to play around with the backend. The demo data creates three washing machines and a display user, which is useful testing the frontend

```PORT=3000```
Set the desired port

## User creation

For creating users, use the route `/api/users`.

For creating a user, a type is necessary.
Currently, there are 3 different user types to choose from:
| Type  | Rights  |
|---|---|
| admin |  ALL |
| machine  | WRITE / Update / READ on machines   |
| display  | READ on machines  |

### Rights

The rights can be translated the following way:
| Right  | CRUD-Equivalent  |
|---|---|
| POST  | CREATE  |
| GET  | READ  |
| PUT  | UPDATE  |
| DELETE | DELETE |

### API-Documentation for the routes

The documentation for the Backend-API can be found at [https://troppes.github.io/washtrak/](https://troppes.github.io/washtrak/).

### Insomnia

The Insomnia folder in the root directory contains a document to test out all routes of the backend.

## Token Expiry

For this project, the JWT tokens are set to not expire, since the washing machine should update the inputs for a long time. If you need expiry for your project, it can be changed in the `middleware\auth.middleware.js` file.

## Docker

A dockerized Version of the backend as well as the documentation can be found under: [https://hub.docker.com/repository/docker/floreitz/washtrak_backend/general](https://hub.docker.com/repository/docker/floreitz/washtrak_backend/general)
