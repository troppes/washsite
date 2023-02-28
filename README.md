# WashTrak

WashTrak allows you to track the current status of your washing machine. It uses an ESP32 board with an MPU-6050 sensor.

## Backend

The backend uses an ExpressJS server that provides REST routes for the data from all the machines currently in use. More information can be found in the [Backend Readme](https://github.com/troppes/washtrak/tree/master/backend).

## Frontend

The frontend has been built using Svelte-Kit. It provides support for creating, modifying and deleting users/machines, as well as a dashboard for the current status of all machines. More information can be found in the [Frontend Readme](https://github.com/troppes/washtrak/tree/master/frontend).

## Controller

The Controller collects the sensor data and calculates the current status of the machine. It then connects to the REST API and uploads the results. The software is written in C/C++ for Arduino. More information can be found in the [Controller Readme](https://github.com/troppes/washtrak/tree/master/controller).

## Deployment Options

### Container

There is a [Backend Container](https://hub.docker.com/repository/docker/floreitz/washtrak_backend/general) and a [Frontend Container](https://hub.docker.com/repository/docker/floreitz/washtrak_frontend/general) available for quick deployment. If you only want to deploy the backend, please see the API documentation for building a frontend: [https://troppes.github.io/washtrak/](https://troppes.github.io/washtrak/)

### Docker Compose

A docker-compose file can be found at [https://github.com/troppes/washtrak/blob/master/docker-compose.yml](https://github.com/troppes/washtrak/blob/master/docker-compose.yml). It assumes deployment to localhost. If you want to deploy in production, please refer to the readme files on Dockerhub for configuration details. Links can be found above and in the front-end and back-end readme files.

#### Ansible

An Ansible deployment task can be found at [https://github.com/troppes/playbooks-public/tree/main/docker/roles/washtrak](https://github.com/troppes/playbooks-public/tree/main/docker/roles/washtrak)

## Future

- After measuring the payment gateway controller, it was found that a pin delivers a different voltage depending on whether the machine is running or not. This can be used to build a better start/end detection.

- During the measurement we also discovered that it is possible to skip the payment by shorting two pins. This could potentially be used for online payments in the future.
