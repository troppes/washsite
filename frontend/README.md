## Setup

To configure the server, rename the .env_dist to .env and edit the variables.

To set up the dev environment, use the `npm i` script followed by `npm run dev`.

If you plan to put the system into production, use `npm i` followed by `npm run build`. The production server will then be in `release` and can be started with `node release/index.js`.

## Usage instructions

The first time you visit the site, you may see an error on the front page. This happens because the user has not yet been created, that is used in the .env file. To fix this, login to the site and go to the admin tab and create a user with the `display` role. If you want to edit anything, you can click into the field of the table.

### Thresholds

When creating a Washing Machine, two fields are needed, called Running/Spinning Thresholds. These thresholds define the level of vibration at which the machine changes its status. To find the correct values, please refer to the [Controller Readme](https://github.com/troppes/washtrak/tree/master/controller).

## Environment variables

### Backend URLs

The frontend has two possible backend URLs, if you are not using docker they should both be the same, pointing to the backend. Otherwise, see the Docker manual below.

```
PUBLIC_BACKEND_URL=http://localhost:3000/api
INTERNAL_BACKEND_URL=http://localhost:3000/api
```

### Display user

For the frontend to work, a user with display rights is required. This can either be the admin (which is not recommended for security reasons) or a user of type display.
The user can be created either via the API or directly in the frontend. To do this, ignore the error on the front page and login as admin. Then create the display user and the frontend should work properly.

```
DISPLAY_USER=display
DISPLAY_PASSWORD=display
```

### Port
PORT=8080

## Docker

A dockerised version of the frontend and documentation can be found at [https://hub.docker.com/r/floreitz/washtrak_frontend](https://hub.docker.com/r/floreitz/washtrak_frontend)
