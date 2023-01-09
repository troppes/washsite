# WashTrak

This repository offers 

## Backend

For the backend an ExpressJS server was used, that offers REST-Routes for the data on all machines currently in use. For more information please refer to the Backend-Readme](https://github.com/troppes/washtrak/tree/master/backend).

## Frontend

The frontend was built with Svelte-Kit. If offers support for user / machine creation, modificacion and deletion, as well as a dashboard for the current status of all machines. For more information please refer to the Backend-Readme](https://github.com/troppes/washtrak/tree/master/frontend).

## Controller

Coming soon!

## Container

There are two containers available for deployment purposes. If you only want to deploy the backend, please refer to the API-Documentation: COMING SOON!

### Docker-Compose

A docker-compose file can be found at [https://github.com/troppes/washtrak/blob/master/docker-compose.yml](https://github.com/troppes/washtrak/blob/master/docker-compose.yml). It assumes the deployment for localhost. If you want to deploy in production, please refer to the Readme-Files at Dockerhub. Links can be found in the specific Readme-Files for the frontend and backend.

### Ansible

A simple ansible deployment task can be found at [https://github.com/troppes/playbooks-public/tree/main/docker/roles/washtrak](https://github.com/troppes/playbooks-public/tree/main/docker/roles/washtrak)

