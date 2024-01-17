# Server

This is the server that receives messages via http and passes them on to a websocket server so the frontend and the hardware can communicate.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (preferably installed with [nvm](https://nvm.sh))

## Setup

Open a terminal to the folder `/server` and run the following command to install all the dependencies and tooling.

```bash
npm ci
```

## Development

To start the development server run the following command in the `/server` folder.

```bash
npm run dev
```
