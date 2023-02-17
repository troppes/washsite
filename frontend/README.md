## Setup

To configure the server, rename the .env_dist to .env and edit the variables.

To setup the dev-enviroment, use the script `npm i` followed by `npm run dev`.

If you are planning on putting the system into production please use `npm i` followed by `npm run build`. The production server can then be found in `release` and can be started with `node release/index.js`

## Usage Instructions

When first visiting the website and error can occur on the homepage. This happens, because the user in the .env file is not yet created. To fix this log into the website and on the administration tab create a user with the `display` role. If you want to edit anything you can click into the table.

### Thresholds

When creating a washing machine two fields called running/spinning threshold are needed. These thresholds define at which level of vibration the machines changes it status. For finding the correct values please refer to the [controller readme](https://github.com/troppes/washtrak/tree/master/controller).

## Environment variables

### Backend URLs

The frontend has two possible backend urls, if you are not using docker, both of should be the same, refering to the backend. Otherwise please refer to the Docker manual below.

```
PUBLIC_BACKEND_URL=http://localhost:3000/api
INTERNAL_BACKEND_URL=http://localhost:3000/api
```

### Display user

For the frontend to work a user with the display rights is needed. That can be either the admin (which is not recommended for security reasons) or a user of the type display.
A creation of the user can be either done though the API, or in the frontend directly. For this ignore the error on the homepage and log in as an admin. Then create the display user and the frontend should work now properly.

```
DISPLAY_USER=display
DISPLAY_PASSWORD=display
```

### Port
`PORT=8080`

## Docker

A dockerized Version of the frontend as well as the documentation can be found under: [https://hub.docker.com/r/floreitz/washtrak_frontend](https://hub.docker.com/r/floreitz/washtrak_frontend)
