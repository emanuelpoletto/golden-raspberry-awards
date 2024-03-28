# Golden Raspberry Awards

This project is a Node.js application that provides an API for fetching and calculating awards data.

## Project Structure

The main codebase is in the `src` directory. Here's a brief overview of the structure:

- `src/api/routes/`: This directory contains the route handlers for the API. Each file corresponds to a different endpoint.
  - `getAwards.js`: This file handles requests to the `/awards` endpoint.
  - `getAwardsIntervals.js`: This file handles requests to the `/awards/intervals` endpoint.
- `src/constants.js`: This file contains various constants used throughout the project.
- `src/index.js`: This is the entry point of the application.
- `src/database/*`: Database related stuff. The application is using an in memory instance of `SQLite` as database.
- `src/fileSystem/*`: File system-related functionalities. The application reads data from a `csv` file on start automatically.

Every time the application is started, it reads data from a given `csv` file and properly seeds the database with that data so it is available to be retrieved through the API endpoints.

## Installation

To install the project dependencies, run the following command in your terminal:
```sh
npm install
```
For the sake of simplicity, there are only 3 dependencies: `sqlite3`, `sqlite`, and `glob`.
No external frameworks and libs have been used neither for the API nor the tests.

## Running the Application

To start the application, use the following command:
```sh
npm start
```
To run the application in dev + watch mode:
```sh
npm run dev
```
By default, the application reads data from a file called `movielist.csv` which is in the root folder. You can define a different file path by passing it in a parameter on the terminal when starting the application if you want. Example:
```sh
npm start -- --file=./path/to/another/file.csv
```

The application will start, read the given (or default) file, seed the database, and listen for requests on `http://localhost:3000`.

## Making Requests

You can make requests to the following endpoints:

- `GET /awards`: Fetches a list of awards limit by `10` by default. You can use both `offset` and `limit` query parameters to manage pagination as needed. Example:

Request:
```js
GET /awards?limit=2
```
Response:
```json
[
  {
    "year": 1980,
    "title": "Can't Stop the Music",
    "studios": "Associated Film Distribution",
    "producers": "Allan Carr"
  },
  {
    "year": 1981,
    "title": "Mommie Dearest",
    "studios": "Paramount Pictures",
    "producers": "Frank Yablans"
  }
]
```

- `GET /awards/intervals`: Calculates and returns minimum and maximum intervals between awards won by producers. Example:

Request:
```js
GET /awards/intervals
```
Response:
```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

You can use any HTTP client like curl, Postman, or your browser to make these requests.

## Running Tests

To run the tests, use the following command:
```sh
npm test
```
You can specify one or more files/paths to run the tests on them only if needed. Example:
```sh
npm test **/getAwards.test.js
```

## Future Improvements

For now, there are only a few integration tests that cover the main expectations on the API endpoints. So more integration tests can be added plus unit and e2e tests, as well.

As the database is in memory on this version, the file reading is also relying on memory for now. That means the file is read synchronously at once and all the data is loaded in memory. One idea of improvement might be reading the file in chunks instead of at once while inserting data incrementally to the database so that would enable the application to work with bigger files.
