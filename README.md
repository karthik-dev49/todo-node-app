
# TODO App

A simple TODO application built with Node.js, Express, and PostgreSQL.

## Features
- RESTful API for managing TODO items
- PostgreSQL database for persistent storage
- CRUD operations: Create, Read, Delete TODOs
- CORS enabled for cross-origin requests

## Requirements
- Node.js
- PostgreSQL

## Setup

1. **Clone the repository**
2. **Install dependencies:**
	```bash
	npm install
	```
3. **Configure PostgreSQL:**
	- Create a database named `todo_db`.
	- Create a table using:
	  ```sql
	  CREATE TABLE todos (
		 id SERIAL PRIMARY KEY,
		 title VARCHAR(255) NOT NULL
	  );
	  ```
	- Update the database credentials in `index.js` if needed.
4. **Start the server:**
	```bash
	node index.js
	```
	The server will run on [http://localhost:5000](http://localhost:5000).

## API Endpoints

- `GET /` — Test endpoint
- `GET /todos` — Get all TODOs
- `POST /todos` — Add a new TODO (JSON body: `{ "title": "Task name" }`)
- `DELETE /todos/:id` — Delete a TODO by ID

## License
ISC
