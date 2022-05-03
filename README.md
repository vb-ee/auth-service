# Auth Service with Nodejs, PostgreSql, Sequelize, Babel, Jest, JWT

## Pre Processes

In the project directory:

Install dependencies:

### `npm install`

Considering environment variables defined and docker pre-installed run:

### `docker-compose up -d`

Starts the databases using environment variables defined in .env file.\
Check if the name of env variables matches the ones defined in docker-compose.yaml file.\
`d` flag is optional as it runs the command in detached mode

## Available Scripts

To start the service run:

### `npm run start`

or in watchmode:

### `npm run watch:start`

To run the tests:

### `npm run test`

in watchmode:

### `npm run watch:test`

You can also view the test coverage by running:

### `npm run test:cover`

It creates the coverage directory with `index.html` file within your project directory.\
You can view the test statistics by opening `index.hmtl` file inside your browser

To debug the code run:

### `npm run debug`

It opens the debugger in your browsers's inspection window.\
You can easily debug the code by inserting `debugger` into the place you want to inspect

## Other Scripts

To create the transpiled dist directory run:

## `npm run transpile`

It creates the dist folder with commonjs syntax from your source code written in es6 syntax

To remove the dist folder:

## `npm run clean`

Joins above two commands into one:

## `npm run build`
