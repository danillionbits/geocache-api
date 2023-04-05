# Geocaching Backend API
This is a Node.js/Express backend API for a geocaching application. It uses MySQL as the database to store and manage data.

## Getting Started
### Prerequisites
Before running the application, make sure you have the following installed:
- Docker
- Docker Compose

### Running the Application
To run the application, follow these steps:

- Clone this repository to your local machine
- Open a terminal and navigate to the project root directory
- Run the following command to start the application:
`docker-compose up`
- The API will be available at http://localhost:8080.

## Environment Variables
The following environment variables are used in the application:

- **MYSQL_HOST**: The host name or IP address of the MySQL server (default: localhost)
- **MYSQL_PORT**: The port number of the MySQL server (default: 3307)
- **MYSQL_USER**: The username for accessing the MySQL server (default: root)
- **MYSQL_PASS**: The password for accessing the MySQL server (default: pass)
- **MYSQL_DATABASE**: The name of the MySQL database (default: geocache)

## API Endpoints
The API supports CRUD operations of these resources `users`, `caches`, `messages`, `images`:

| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| GET    | /:resouce          | Get all items from a table  |
| GET    | /:resouce/:id      | Get an item by id           |
| POST   | /:resouce          | Create a new item           |
| PUT    | /:resouce/:id      | Update an existing item     |
| DELETE | /:resouce/:id      | Delete an item              |

### Custom Endpoints
The API also supports the following custom endpoints:


| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| POST   | /:login            | Authenticate a user         |
| POST   | /:register         | Register a new user         |