## Setup

To set everything up and create the SQLite database, use the script `npm i` followed by `npm run setup`. With this the database will be created. Customize the entries by going into the TODO file and changing the default users.

## Authentication

To authenticate yourself, please use the `/api/auth/login` route. You can authenticate yourself there with BASIC auth. Afterwards, you get a JWT token. All other routes are only accessible wit this token.

## User creation

For creating users, use the route `/api/users`.

For creating a user, a type is necessary.
Currently, there are 3 different user types to choose from:
| Type  | Rights  |
|---|---|
| admin |  ALL |
| machine  | WRITE / Update on machines   |
| display  | READ on machines  |

### Rights

The rights can be translated the following way:
| Right  | CRUD-Equivalent  |
|---|---|
| POST  | CREATE  |
| GET  | READ  |
| PUT  | UPDATE  |
| DELETE | DELETE |

## Routes

COMING SOON!

## Token Expiry

For this project, the JWT tokens are set to not expire, since the washing machine should update the inputs for a long time. If you need expiry for your project, it can be changed in the `middleware\auth.middleware.js` file.

## TODO

- Rename table and add structure for the machines
- Add Users route to create and delete users
- Add env support
- Docker Support
- Machine Error Detection