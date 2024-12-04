# Flashcards

## Connecting to the Database

1. Create a `.env` file in the root folder.
2. In the `.env` file, add your database credentials:

```plaintext
DATABASE_USERNAME = "yourUsername"
DATABASE_PASSWORD = "yourPassword"
DATABASE_NAME = "yourClusterName"
```
## Setting Up the Project and Configuration
### Installing Packages
Run the following commands to install the required packages:

```sh
npm install
npm install -g nodemon tsc 
```
### Running the Project
To start the project, use the following commands:

```sh
tsc -p tsconfig.json --watch
nodemon dist/app.js
```
## Fetching Data from the Server
### Registration Example (JavaScript)
To register a new user, make a POST request to the /register endpoint. Here’s an example in JavaScript:

```js
fetch('http://localhost:3000/register', { 
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password, email })
});
```
### Login Example (JavaScript)
For login, you can use either the username or email. Here’s an example of a POST request to the login route:

```js
fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ usernameOrEmail, password })
});
```